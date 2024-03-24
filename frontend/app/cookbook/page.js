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
    const curve = Form.useWatch('curve', cookbookForm);
    const op = Form.useWatch('operation', cookbookForm);
    const lib = Form.useWatch('library', cookbookForm);

    const getLibraries = (curve) => {
      if (curve in libraries_selection) {
        return libraries_selection[curve].map(option => ({
          ...option,
          value: option.key
        }));
      }
      return [];
    };

    const getMachines = (cur_curve, cur_lib) => {
      if (cur_curve in machines_selection) {
        if (cur_lib in machines_selection[cur_curve]) {
          return machines_selection[cur_curve][cur_lib].map(option => ({
            ...option,
            value: option.key
          }));
        }
      }
      return [];
    }

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
        <Form.Item label="Proving System" name="backend" >
          <Select style={{ width: 130 }} options={backends_selection} />
        </Form.Item>
        <Form.Item label="Curve" name="curve" >
          <Select style={{ width: 130 }} options={Object.values(curves).map(({ key }) => ({ key, value: key }))} />
        </Form.Item>
        <Form.Item label="Operation" name="operation" >
          <Select style={{ width: 190 }} options={operations_selection} />
        </Form.Item>
        <Form.Item label="Library" name="library" >
          <Select style={{ width: 190 }} options={getLibraries(curve)} />
        </Form.Item>
        <Form.Item label="Machine" name="machine" >
          <Select style={{ width: 190 }} options={getMachines(curve, lib)} />
        </Form.Item>
        <Form.Item label="Proof Task" name="proof_task" >
          <Select style={{ width: 100 }} options={proof_task_selection} />
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
