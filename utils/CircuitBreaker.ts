type RequestFunction<T> = (args: T) => Promise<any>;

interface CircuitBreakerOptions {
    failureThreshold?: number;
    successThreshold?: number;
    timeout?: number;
    resetTimeout?: number;
}

export class CircuitBreaker<T> {

    private request: RequestFunction<T>;
    private state: 'OPEN' | 'CLOSED' | 'HALF_OPEN';
    private failureCount: number;
    private successCount: number;
    private nextAttempt: number;

    private failureThreshold: number;
    private successThreshold: number;
    private timeout: number;
    private resetTimeout: number;

    constructor(request: RequestFunction<T>, options: CircuitBreakerOptions = {}) {
        this.request = request;
        this.state = 'CLOSED';
        this.failureCount = 0;
        this.successCount = 0;
        this.nextAttempt = Date.now();

        this.failureThreshold = options.failureThreshold ?? 3;
        this.successThreshold = options.successThreshold ?? 2;
        this.timeout = options.timeout ?? 7000;
        this.resetTimeout = options.resetTimeout ?? 30000;
    }

    async exec(args: any): Promise<any> {
        if (this.state === 'OPEN' && Date.now() > this.nextAttempt) {
            this.state = 'HALF_OPEN';
        }

        if (this.state === 'CLOSED' || this.state === 'HALF_OPEN') {
            try {
                const response = await this.request(args);
                return this.onSuccess(response);
            } catch (error) {
                return this.onFailure(error);
            }
        }

        return new Error('Circuit is OPEN');
    }

    private onSuccess(response: any): any {
        if (this.state === 'HALF_OPEN') {
            this.successCount++;

            if (this.successCount > this.successThreshold) {
                this.successCount = 0;
                this.state = 'CLOSED';
            }
        }
        this.failureCount = 0;
        return response;
    }

    private onFailure(error: any): any {
        this.failureCount++;

        if (this.failureCount >= this.failureThreshold) {
            this.state = 'OPEN';
            this.nextAttempt = Date.now() + this.resetTimeout;
        }
        return error;
    }
}

