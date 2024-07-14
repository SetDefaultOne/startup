import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";
import { ErrorResponseBody } from "@bootstrap-brand/sdk";

@Catch()
export class UnhandledExceptionsFilter implements ExceptionFilter {
    private logger = new Logger(UnhandledExceptionsFilter.name);

    constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

    catch(exception: unknown, host: ArgumentsHost): void {
        const { httpAdapter } = this.httpAdapterHost;

        const ctx = host.switchToHttp();

        if (exception instanceof HttpException) {
            return httpAdapter.reply(ctx.getResponse(), exception.getResponse(), exception.getStatus());
        }

        if (exception instanceof Error) {
            this.logger.error(exception.message, exception.stack);
        }

        httpAdapter.reply(
            ctx.getResponse(),
            {
                status: "error",
                message: "Server encountered an unknown error.",
                data: null,
                code: "E-0001",
            } satisfies ErrorResponseBody<null>,
            HttpStatus.INTERNAL_SERVER_ERROR,
        );
    }
}
