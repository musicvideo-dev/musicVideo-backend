import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Admin } from "../entity/admin.entity";
import { UpdateProfileAdminDto } from "../dto/update-profile-admin.dto";
import { HashService } from "src/modules/common/services/hash.service";

@Injectable()
export class AdminService {
    constructor(
        @InjectRepository(Admin) private adminRepository: Repository<Admin>,
        private readonly hashService: HashService
    ) {

    }
    async getProfileAdmin(adminId: number) {
        return await this.adminRepository.findOne({
            where: {
                id: adminId
            }
        })
    }

    async updateProfileAdmin(adminId: number, dto: UpdateProfileAdminDto) {
        const { email, firstName, lastName, mobile, username, password } = dto
        const hashPassword = await this.hashService.hashString(password);
        await this.adminRepository.update({ id: adminId }, {
            ...(firstName && {
                firstName
            }),
            ...(lastName && {
                lastName
            }),
            ...(email && {
                email
            }),
            ...(mobile && {
                mobile
            }),
            ...(username && {
                username
            }),
            ...(password && {
                password: hashPassword
            })
        })

        return await this.adminRepository.findOneBy({ id: adminId })
    }
}