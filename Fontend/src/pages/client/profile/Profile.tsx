import { Card, Avatar, Row, Col } from 'antd';
import "./Profile.css"
import {useState} from "react"
import { Button, Checkbox, Form, Input } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
interface IProps{
  handleUpdateProfile(data:any,callback:()=>void):void;
  user:any
}
const Profile = (props:IProps) => {
  const [profile, setProfile] = useState(false)
  const { Meta } = Card;
  console.log(props.user);
  
  const onFinish = async(values: any) => {
 await props.handleUpdateProfile(values,()=>{
  setProfile(false)
 })
  


  };
  

  
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  const showProfile=(
    <Row justify="center">
    <Col span={8}>
      <Card>
        <Meta
          avatar={
            <Avatar className='avatar' src="https://lh5.googleusercontent.com/x14nnYSvR1c8KkO6Kj1giR4iZcQL0UelyqcGBRFt8fHQg8sRUouMkFc3b_F-kmDLDW-qpDo8KkBpuXGnfUNjy6NZVqwAcBYnngbupNd2scJqGyNpjYTGQZdfY3ktqFJZNsKfXR-YrDmqrcQwOrM4k2M" />
          }
          title={props?.user?.name}
          description="Web Developer"
        />
        <h3>About Me:</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus tincidunt ultrices risus eu gravida.</p>
        <h3>Contact Information:</h3>
        <ul>
          <li>Email: {props?.user?.email}</li>
          <li>Phone: {props?.user?.phone}</li>
        </ul>
        <Button onClick={()=>setProfile(true)}>Edit profile</Button>
      </Card>
   
    </Col>
    
  </Row>
  )
  const editProfile=(
    <div>
       <Row justify="center">
       
       <Col span={8}>
         <Card>
           <Meta
             avatar={
               <Avatar className='avatar' src="https://lh5.googleusercontent.com/x14nnYSvR1c8KkO6Kj1giR4iZcQL0UelyqcGBRFt8fHQg8sRUouMkFc3b_F-kmDLDW-qpDo8KkBpuXGnfUNjy6NZVqwAcBYnngbupNd2scJqGyNpjYTGQZdfY3ktqFJZNsKfXR-YrDmqrcQwOrM4k2M" />
             }
             title={props?.user?.name}
             description="Web Developer"
           />
           <h3>About Me:</h3>
           <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus tincidunt ultrices risus eu gravida.</p>
           <h3>Contact Information:</h3>
           <Form
    name="basic"

    initialValues={{ remember: true }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item
      label="Username"
      name="name"
      rules={[{ required: true, message: 'Please input your username!' }]}
      initialValue={props?.user?.name}
    >
      <Input />
    </Form.Item>
    <Form.Item
      label="Email"
      name="email"
      rules={[{ required: true, message: 'Please input your email!',type:"email" }]}
      initialValue={props?.user?.email}
    >
      <Input />
    </Form.Item>
    <Form.Item
      label="Phone"
      name="phone"
      rules={[{ required: true, message: 'Please input your phone!' }]}
      initialValue={props?.user?.phone}
    >
      <Input />
    </Form.Item>

  

    <Form.Item >
      <Button type="primary" htmlType="submit" >Save</Button>

    </Form.Item>
  </Form>
         </Card>
      
       </Col>
       
     </Row>
    </div>
  )
  return (
    <div className="profile-main">
      <ToastContainer></ToastContainer>
       <h1>Your profile</h1>
      {!profile ? showProfile : editProfile}
    </div>
  );
};

export default Profile
