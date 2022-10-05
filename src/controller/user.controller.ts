import { Controller, Get, Req } from "@nestjs/common";


@Controller('user')
export class UserController{
    @Get('info')
    getUserInfo(){
        return {
            username: 'test',
            posts: [],
            postsSaved: []
        }
    }
}