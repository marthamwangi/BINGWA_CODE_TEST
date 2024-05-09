import { PartialType } from '@nestjs/mapped-types';
import { CreateServiceDto } from './create-service-dto';
export class UpdateServicetDto extends PartialType(CreateServiceDto) {}
