import { Button, Select, Form, Input } from 'antd';
import {useEffect,useState} from "react"
import { getProduct } from '../../../api/products';
import { useParams } from 'react-router-dom';
import { IProduct } from '../../../types/products';
import { ICate } from '../../../types/categories';
interface IProps{
    handleCreateProduct( data:any):void
    categories:ICate[]
}
const CreateProduct = (props:IProps) => {
 
    const onFinish = (values: any) => {
        console.log('Success:', values);
        props.handleCreateProduct(values)
      };
      
      const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
      };
  return (
    <div>
        <h1>CreateProduct</h1>
       
        <Form
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600 }}
    initialValues={{ remember: true }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item
      label="name"
      name="name"
      rules={[{ required: true, message: 'Please input your username!' }]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      label="Image"
      name="image"
      rules={[{ required: true, message: 'Please input your password!' }]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      label="Price"
      name="price"
      rules={[{ required: true, message: 'Please input your Price!' }]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      label="Desc"
      name="desc"
      rules={[{ required: true, message: 'Please input your password!' }]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      label="Material"
      name="material"
      rules={[{ required: true, message: 'Please input your password!' }]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      label="Outstanding"
      name="outstanding"
      rules={[{ required: true, message: 'Please input your password!' }]}
 
    >
    <Select > 
        <option value={false} >Không nổi bật</option>
       
    <option value={true} >Nổi bật</option>
      
      
      </Select>
    </Form.Item>
    <Form.Item
      label="Category"
      name="categoryId"
      rules={[{ required: true, message: 'Please input your password!' }]}
      
    >
      <Select > 
        <option >Chọn danh mục</option>
        {props.categories?.map((item:any)=>(
            <option value={item._id} >{item.name}</option>
        ))}
      
      </Select>
    </Form.Item>

    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>

    </div>
  )
}

export default CreateProduct