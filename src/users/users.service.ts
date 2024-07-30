import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
   
  private dbObj:User[] = [
    {id:1,email:"AsadSajjad777@gmail.com",name:"AsadSajjad",phoneNo:'03060574917'},
    {id:2,email:"HamzaAthar@gmail.com",name:"HamzaAthar",phoneNo:'03060574917'}
  ]

  create(createUserDto: CreateUserDto) {
    const newuser:User = {
      id:this.dbObj.length+1,
      ...createUserDto
    }
    this.dbObj.push(newuser)
    return Promise.resolve(newuser)
  }

  findAll() {
    return Promise.resolve(this.dbObj)
  }

  findOne(id: number) {
    const user = this.dbObj.find(item=>item.id === id)
    if(!user) throw new Error(`User with id ${id} does not exist`)
    return Promise.resolve(user)
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const user = this.dbObj.find(item=>item.id === id)
    if(!user) throw new Error(`User with id ${id} does not exist`)
    Object.assign(user,updateUserDto)  
    return Promise.resolve(`User with id ${id} updated!`)
  }

  remove(id: number) {
    const index = this.dbObj.findIndex(item=>item.id === id)
    if(index === -1) throw new Error(`User with id ${id} does not exist`)
    this.dbObj.splice(index,1)  
     return Promise.resolve(`User with id ${id} updated!`)
  }
}
