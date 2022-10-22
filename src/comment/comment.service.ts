import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { EExtentionType, FilesService } from 'src/fileLoader/fileLoader.service';
import { EPublished } from 'src/models/case.model';
import { Comments } from 'src/models/comment.model';
import { Company } from 'src/models/company.model';
import { CreateCommentDto } from './dto/CreateCommentDto';

@Injectable()
export class CommentService {
    constructor(@InjectModel(Comments)private commentModel:typeof Comments, @InjectModel(Company)private CompanyModel:typeof Company,
    private readonly fileService: FilesService){}

    async getAll() {
        const allComments = await this.commentModel.findAll({include:{all:true}})
        return allComments
    }
    async getOne(id: number) {
        const Comment = await this.commentModel.findByPk(id)
        if (Comment) return Comment
        throw new HttpException('Комментарий не найден',HttpStatus.NOT_FOUND)
    }
    async create(id:number, dto: CreateCommentDto, file: Express.Multer.File) {
        if (Object.values(EPublished).includes(dto.published)) {
        const Company= await this.CompanyModel.findByPk(id)
        const picture = this.fileService.upload(file,EExtentionType.IMAGE)
        const NewComment = await this.commentModel.create({...dto,picture_dir:picture,grade:Number(dto.grade)})
        Company.$add('comment',NewComment)
        return NewComment
        }
        throw new HttpException('Не содержит нужный enum',HttpStatus.BAD_REQUEST)

    }

    async update(id: number, dto: CreateCommentDto, file?: Express.Multer.File) {
        const comment = await this.commentModel.findByPk(id)
        if (comment) {
            if (file){
                const picture= this.fileService.update(file,comment.picture_dir,EExtentionType.IMAGE)
                const newComment = await comment.update({
                    picture_dir:picture,...dto,grade:Number(dto.grade)
                })
            }
            

        }
    }
    async delete(id: number) {
        const lastComment = await this.commentModel.findByPk(id)

        if(!lastComment) {
            throw new HttpException("Company not fount", HttpStatus.NOT_FOUND)
        }

        if(
            !await this.commentModel.destroy({
                where: {id}
            })
        ){
            throw new HttpException("Can't delete", HttpStatus.BAD_REQUEST)
        }

        return lastComment

    }
}
