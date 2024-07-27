import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";
import { QueryErrorBody } from "@bootstrap-brand/sdk";

@Catch()
export class UnhandledExceptionsFilter implements ExceptionFilter {
    private readonly logger = new Logger(UnhandledExceptionsFilter.name);

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
                code: "E-X5000",
            } satisfies QueryErrorBody,
            HttpStatus.INTERNAL_SERVER_ERROR,
        );
    }
}
