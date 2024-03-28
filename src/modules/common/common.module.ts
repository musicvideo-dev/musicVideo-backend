import { Module } from "@nestjs/common";
import { HashService } from "./services/hash.service";
import { PublicService } from "./services/public.service";

@Module({
    imports: [],
    controllers: [],
    providers: [PublicService, HashService],
    exports: [PublicService, HashService]
})

export class CommonModule {

}