import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuditService } from './audit.service';
import { JwtAuthGuard } from '../../../common/guards/jwt.auth.guard';
import { RoleGuard } from '../../../common/guards/role.guard';

@Controller('audit')
@UseGuards(JwtAuthGuard, RoleGuard)
export class AuditController {
    constructor(private readonly auditService: AuditService) {}

    @Get('info')
    async getAudit() {
        return await this.auditService.getAudit();
    }
}
