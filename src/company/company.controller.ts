import { Body, Controller, Delete, Get, Param, Post, Put, Res, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { CompanyService } from "./company.service";
import { CreateCompanyDto } from "./dto/createCompany.dto";

@Controller("/company")
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get()
  getAll() {
    return this.companyService.getAll()
  }

  @Get("/image/:id")
  getImage(@Param('id') id: number, @Res() res) {

  }

  @Get("/:id")
  getOne(@Param('id') id: number) {
    return this.companyService.getOne(id)
  }

  @Post("/create")
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'logo', maxCount: 1 },
    { name: 'mainIcon', maxCount: 1 },
  ]))
  add(@UploadedFiles() files: { logo: Express.Multer.File[], mainIcon: Express.Multer.File[] }, @Body() company: CreateCompanyDto ) {
    return this.companyService.create(files, company)
  }
  
  @Put("/update/:id")
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'logo', maxCount: 1 },
    { name: 'mainIcon', maxCount: 1 },
  ]))
  update( @Param('id') id: number, @Body() company: CreateCompanyDto, @UploadedFiles() files?: { logotip?: Express.Multer.File[], main_page?: Express.Multer.File[] }) {
    return  this.companyService.update(id, company)
  }

  @Delete("/delete/:id")
  delete(@Param('id') id: number) {
    return  this.companyService.delete(id)
  }
}