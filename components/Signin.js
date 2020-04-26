import { Button, Checkbox, Form, Input, message as Message, Row } from 'antd'
import {
  AiOutlineEye as EyeOutlined,
  AiOutlineMail as MailOutlined,
  AiFillAmazonCircle as AmazonCircleFilled,
} from 'react-icons/ai/index.esm'

import Link from 'next/link'
import styles from './styles/Signin.css'

const FormItem = Form.Item

const Signin = ({ form }) => (
  <Row
    type="flex"
    align="middle"
    justify="center"
    style={{ minHeight: '100vh' }}
  >
    <div className={styles.component}>
      <div className="text-center mb-5">
        <Link href="/signin">
          <a className="brand mr-0">
            <AmazonCircleFilled size={48} strokeWidth={1} />
          </a>
        </Link>
        <h5 className="mb-0 mt-3">Sign in</h5>

        <p className="text-muted">get started with our service</p>
      </div>

      <Form layout="vertical">
        <FormItem
          label="Email"
          name="email"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ]}
        >
          <Input
            prefix={
              <MailOutlined
                size={16}
                strokeWidth={1}
                style={{ color: 'rgba(0,0,0,.25)' }}
              />
            }
            type="email"
            placeholder="Email"
          />
        </FormItem>

        <FormItem
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input
            prefix={
              <EyeOutlined
                size={16}
                strokeWidth={1}
                style={{ color: 'rgba(0,0,0,.25)' }}
              />
            }
            type="password"
            placeholder="Password"
          />
        </FormItem>

        <FormItem>
          <FormItem name="remember">
            <Checkbox>Remember me</Checkbox>
          </FormItem>
          <Link href="/forgot">
            <a className="text-xs-right">
              <small>Forgot password</small>
            </a>
          </Link>
          <Button type="primary" htmlType="submit" block className="mt-3">
            Log in
          </Button>
        </FormItem>

        <div className="text-center">
          <small className="text-muted">
            <span>Don't have an account yet?</span>{' '}
            <Link href="/signup">
              <a>&nbsp;Create one now!</a>
            </Link>
          </small>
        </div>
      </Form>
    </div>
  </Row>
)

export default Signin
