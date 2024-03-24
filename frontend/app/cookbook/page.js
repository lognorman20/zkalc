'use client'

import React, { useEffect } from "react";

import "katex/dist/katex.min.css";

import {
  PlusOutlined,
  DownOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Select,
  Space,
  Tooltip,
  Typography,
  Dropdown,
} from "antd";

import { parse, ResultSet } from "mathjs";

import { Layout } from "../../components/layout";
import { Recipe } from "../../components/recipe";
import { estimator, estimates } from "../../lib/estimates";
import { humanTime, siTime } from "../../lib/time";
import {
  operations,
  backends,
  backends_selection,
  operations_selection,
  machines_selection,
  libraries_selection,
  curves_selection,
  proof_task_selection,
} from "../../lib/selections";
import {
  cookbook,
} from "../../lib/cookbook";

import curves from "../../data/curves.json";
import libraries from "../../data/libraries.json";
import machines from "../../data/machines.json";
import defaults from "../../data/defaults.json";

const { Text } = Typography;

export default function Home() {
  const [cookbookForm] = Form.useForm();

  const BackendSelection = () => {
    // const lib = cfg.lib;
    // const curve = cfg.curve;
    // const machine = cfg.machine;
    // const backend = cfg.backend;
    // const op = cfg.op;
    const onFinish = (values) => {
      console.log(values);
    };

    return (
      <Form
        form={cookbookForm}
        name="cookbook-form"
        onFinish={onFinish}
        layout="horizontal"
        style={{ maxWidth: 600 }}
      >
        <Form.Item label="Proving System" name="backend" required>
          <Select style={{ width: 130 }} options={backends_selection} />
        </Form.Item>
        <Form.Item label="Curve" name="curve" required>
          <Select style={{ width: 130 }} options={Object.values(curves).map(({ key }) => ({ key, value: key }))} />
        </Form.Item>

        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Space>
        </Form.Item>
      </Form>
    )
  }
  return (
    <Layout>
      <Row align="center">
        <Text align="left" fontSize={20} color="#999">
          <BackendSelection />
        </Text>
      </Row>

      <br />
      <br />
    </Layout>
  )
}
