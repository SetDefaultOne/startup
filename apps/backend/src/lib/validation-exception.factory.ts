import { BadRequestException } from "@nestjs/common";
import { ValidationError } from "class-validator";

export function validationExceptionFactory(errors: ValidationError[]) {
    return new BadRequestException({
        status: "fail",
        message: "Could not validate request.",
        data: errors.reduce(
            (errors, error) => {
                const message = Object.values(error.constraints ?? {}).at(0);

                if (message) {
                    errors[error.property] = message;
                }

                return errors;
            },
            {} as Record<string, string>,
        ),
    });
}
