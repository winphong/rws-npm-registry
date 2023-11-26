import { Divider } from "@blueprintjs/core";
import { useLoaderData } from "react-router";
import Contributors from "src/components/Contributors";
import { Spacer } from "src/components/Spacer";
import { NpmPkgDetail } from "src/typings/npm";
import styled from "styled-components";

const NpmPackageDetail = () => {
  const data = useLoaderData() as NpmPkgDetail;

  if (!data) {
    return null;
  }

  const url = data.repository?.url?.split("+")[1];

  return (
    <Container>
      <Title className="bp5-text-large">
        <a
          href={`https://www.npmjs.com/package/${data.name}`}
          target="_blank"
          rel="noreferrer"
          style={{ textDecoration: "none" }}
        >
          {data.name}
        </a>{" "}
        &#183; v{data.version}
      </Title>
      <Divider />
      <span className="bp5-text-muted">{data.description}</span>
      {url && (
        <div>
          <Spacer height={"3vh"} />
          <span>Repository</span>
          <Divider />
          <a href={url}>{url}</a>
        </div>
      )}
      <div>
        <Spacer height={"3vh"} />
        {data.contributors?.length > 0 ? (
          <Contributors title="Contributors" people={data.contributors} />
        ) : (
          <Contributors title="Maintainers" people={data.maintainers} />
        )}
      </div>
    </Container>
  );
};

const Title = styled.span`
  font-size: 24px;
`;

const Container = styled.div`
  max-width: 60vw;
`;
export default NpmPackageDetail;
