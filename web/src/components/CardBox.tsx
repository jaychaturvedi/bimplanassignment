import React from "react";
import { Card, Switch } from "antd";
import { useAppContext } from "../context/provider";
const { Meta } = Card;

interface Props {
  post: {
    id: number;
    title: string;
    description: string;
    status: boolean;
    updatedAt: string; //date
    createdAt: string; //date}
  };
}
export default function CardBox(props: Props) {
  const { state, dispatch, getPosts, updatePost } = useAppContext();
  const { post } = props;
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Card
        hidden={!post.status}
        hoverable={true}
        bordered={true}
        onClick={() => console.log("clicked", post.id)}
        // bordered={false}
        style={{
          width: 300,
          background: "#f3ca20",
          padding: 20,
          margin: 20,
        }}
        key={post.id}
      >
        <div style={{ position: "absolute", right: 8 }}>
          <Switch
            size={"small"}
            defaultChecked={false}
            checked={post.status}
            onChange={async (value: boolean) => {
              updatePost(post.id, {
                ...post,
                status: value,
              });
            }}
          />
        </div>
        {/* <h2
          style={{
            color: "#1868ae",
          }}
        >
          {post.title}
        </h2>
        <p style={{ fontSize: 16 }}>{post.description}</p> */}
        <Meta
          title={post.title}
          description={post.description}
          style={{ color: "red" }}
        />
      </Card>
    </div>
  );
}
