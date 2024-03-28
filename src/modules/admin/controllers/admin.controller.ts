import { Body, Controller, Get, Patch } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { GetAdmin } from "src/lib/decorators/get-admin";
import { ITokenPayloadAdmin } from "src/lib/types/token.interface";
import { AdminService } from "../services/admin.service";
import { UpdateProfileAdminDto } from "../dto/update-profile-admin.dto";

@Controller('/admin/profile')
@ApiTags('Admin/profile')
export class AdminController {
    constructor(
        private readonly adminService: AdminService
    ) {

    }
    @Get('/')
    async getProfileAdmin(@GetAdmin() admin: ITokenPayloadAdmin) {
        return await this.adminService.getProfileAdmin(admin.id)
    }

    @Patch('/')
    async updateProfileAdmin(@GetAdmin() admin:ITokenPayloadAdmin , @Body() dto:UpdateProfileAdminDto){
        return await this.adminService.updateProfileAdmin(admin.id,dto);
    }
}