import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
    describe('matrix solver', () => {
      it('should be invalid format',()=>{
        let data = {
          body:{
            matrix: "asdsadsad",
            find_number: 10
          }
        }
        expect(appController.solveProblem(data)).toMatchObject({
          status: 400,
          msg: "invalid format"
        })
      })
      it('should be matrix not sorted',()=>{
        let data = {
          body:{
            matrix: "[[1,2,7,8],[5,14,18,20],[23,30,32,65]]",
            find_number: 10
          }
        }
        expect(appController.solveProblem(data)).toMatchObject({
          result: false,
          msg: "The matrix not sorted from low to high number",
          status: 400
        })
      })
      it('should be target not found',()=>{
        let data = {
          body:{
            matrix: "[[1,2,7,8],[10,14,18,20],[23,30,32,65]]",
            find_number: 5
          }
        }
        expect(appController.solveProblem(data)).toMatchObject({
          result: false,
          msg: "not found",
          status: 201
        })
      })
      it('should be target not found',()=>{
        let data = {
          body:{
            matrix: "[[1,2,7,8],[10,14,18,20],[23,30,32,65]]",
            find_number: 10
          }
        }
        expect(appController.solveProblem(data)).toMatchObject({
          result: true,
          msg: [1, 0],
          status: 200
        })
      })
    })
  });
});
