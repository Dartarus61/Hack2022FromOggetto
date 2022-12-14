import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import axios from 'axios';
import { map } from 'rxjs';
import { MailService } from 'src/mail/mail.service';
import { EPublished } from 'src/models/case.model';
import { ECrudOperation, Moderator } from 'src/models/moderator.model';


@Injectable()
export class ModeratorService {
    constructor(@InjectModel(Moderator)private readonly moderatorModel:typeof Moderator, private httpService:HttpService,
    private mailService:MailService){}

    async create(data:JSON,CRUD_Oper:ECrudOperation,entity_name:string){
            const bdata:Moderator=await this.moderatorModel.create({data,type_Crud:CRUD_Oper,entity_name,date:new Date})
    }

    async updateStatus(status:EPublished,id:number,comment?:string) {
        if (Object.values(EPublished).includes(status)) {            
        const resolveRequest = await this.moderatorModel.findByPk(id)
        if (!resolveRequest) throw new HttpException('Модерируемый объект не найден',HttpStatus.NOT_FOUND)
        await resolveRequest.update({published:status}) 
        if (status==EPublished.DENIED){
               await resolveRequest.update({comment})
        }
        if (status==EPublished.YES || status==EPublished.DENIED){
            let tmp=JSON.stringify(resolveRequest.data)
            
           this.mailService.SendNotification(resolveRequest.data.email,resolveRequest.entity_name,status)
         }
        const { data } = await axios.post(
            `http://localhost:3000/${resolveRequest.entity_name}/upstat/${resolveRequest.data.id}`,
            { status },
            {
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
              },
            },
          );
    }else throw new HttpException('Ошибка ввода данных',HttpStatus.BAD_REQUEST)}
    
}




