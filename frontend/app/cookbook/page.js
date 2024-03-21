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
  const [cfg, setCfg] = React.useState(defaults);
  const [proofTask, setProofTask] = React.useState("verify")
  const [humanTimeFormat, setHumanTimeFormat] = React.useState(true);

  const formatTime = (num) => (humanTimeFormat ? humanTime : siTime)(num);

  const est = () => {
    return estimator(
      cfg.curve,
      cfg.lib,
      cfg.machine,
      cfg.op
    );
  };

  const estimate = () => {
    const param = 1234; // n or r1cs
    const cookbook_operations = {
      // kzg: () => 
    }
  }

  const handleLibChange = (new_lib) => {
    let new_curve = cfg.curve;
    let new_machine = cfg.machine;

    if (!(new_machine in estimates[new_curve][new_lib])) {
      new_machine = machines_selection[new_curve][new_lib].filter(
        (x) => !x.disabled
      )[0].key;
    }

    setCfg({ curve: new_curve, lib: new_lib, op: cfg.op, machine: new_machine, backend: cfg.backend });
  };

  const handleCurveChange = (new_curve) => {
    let new_lib = cfg.lib;
    let new_machine = cfg.machine;

    if (!(new_lib in estimates[new_curve])) {
      new_lib = libraries_selection[new_curve].filter((x) => !x.disabled)[0]
        .key;
    }

    if (!(new_machine in estimates[new_curve][new_lib])) {
      new_machine = machines_selection[new_curve][new_lib].filter(
        (x) => !x.disabled
      )[0].key;
    }

    setCfg({ curve: new_curve, lib: new_lib, op: cfg.op, machine: new_machine, backend: cfg.backend });
  };

  const handleMachineChange = (new_machine) => {
    setCfg({ curve: cfg.curve, lib: cfg.lib, op: cfg.op, machine: new_machine, backend: cfg.backend });
  };

  const handleBackendChange = (index) => {
    const selectedBackend = backends_selection[index];
    setCfg({ curve: cfg.curve, lib: cfg.lib, op: cfg.op, machine: cfg.machine, backend: selectedBackend.label });
  };

  const handleOpChange = (new_op) => {
    setCfg({ curve: cfg.curve, lib: cfg.lib, op: new_op, machine: cfg.machine, backend: cfg.backend });
  }

  const BackendSelection = () => {
    const lib = cfg.lib;
    const curve = cfg.curve;
    const machine = cfg.machine;
    const backend = cfg.backend;
    const op = cfg.op;
    // TODO: Add data member for r1cs or n

    return (
      <>
        Estimating with the &nbsp;
        <Dropdown
          menu={{
            items: backends_selection.map((backend, index) => ({ key: index, ...backend })),
            onClick: ({ key }) => handleBackendChange(key),
          }}
        >
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              {backend}
              <DownOutlined style={{ fontSize: "10px", margin: "-10px" }} />
              &nbsp;
            </Space>
          </a>
        </Dropdown>
        proving system using the curve &nbsp;
        <Dropdown
          menu={{
            items: curves_selection,
            onClick: ({ key }) => handleCurveChange(key),
          }}
        >
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              {curves[curve].label}
              <DownOutlined style={{ fontSize: "10px", margin: "-10px" }} />
              &nbsp;
            </Space>
          </a>
        </Dropdown>
        with the operation
        <Select
          style={{ width: 200, padding: 5 }}
          defaultValue={op}
          options={operations_selection}
          onChange={handleOpChange}
        />
         implemented in &nbsp;
        <Tooltip
          placement="top"
          title={`${libraries[lib].label} v${libraries[lib].version}`}
        >
          <Dropdown
            menu={{
              items: libraries_selection[curve],
              onClick: ({ key }) => handleLibChange(key),
            }}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                {libraries[lib].label}
                <DownOutlined style={{ fontSize: "10px", margin: "-10px" }} />
                &nbsp;
              </Space>
            </a>
          </Dropdown>
        </Tooltip>
        using &nbsp;
        <Tooltip
          placement="top"
          title={` ${machines[machine].os} ${machines[machine].cpu}, ${machines[machine].ram}`}
          overlayInnerStyle={{
            width: machines[machine].tooltip_width,
          }}
        >
          <Dropdown
            menu={{
              items: machines_selection[curve][lib],
              onClick: ({ key }) => handleMachineChange(key),
            }}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                {machines[machine].label}
                <DownOutlined style={{ fontSize: "10px", margin: "-10px" }} />
                &nbsp;
              </Space>
            </a>
          </Dropdown>
        </Tooltip>
        doing the &nbsp;
        <Dropdown
          menu={{
            items: proof_task_selection,
            onClick: ({ key }) => setProofTask(key),
          }}
        >
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              {proofTask}
              <DownOutlined style={{ fontSize: "10px", margin: "-10px" }} />
              &nbsp;
            </Space>
          </a>
        </Dropdown>
        step. &nbsp;
      </>
    );
  };

  return (
    <Layout>

      <Row align="center">
        <Text align="center" fontSize={20} color="#999">
          <BackendSelection />
        </Text>
      </Row>

      <Text align="center" fontSize={20} color="#999">
        {estimate()}
      </Text>

      <br />
      <br />
    </Layout>
  );
}
