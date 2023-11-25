import { Divider } from "@blueprintjs/core";
import _ from "lodash";
import { useLoaderData } from "react-router";
import { Spacer } from "src/components/Spacer";
import styled from "styled-components";

const NpmPackageDetail = () => {
  const data = useLoaderData() as {
    name: string;
    version: string;
    description: string;
    homepage: string;
    repository: { type: string; url: string };
    icon: string;
    license: string;
    contributors: Array<{ name: string; email: string }>;
    maintainers: Array<{ name: string; email: string }>;
  };

  if (!data) {
    return null;
  }

  const url = data.repository?.url?.split("+")[1];

  return (
    <Container>
      <Title className="bp5-text-large">
        {data.name} v{data.version}
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
          <>
            <span>Contributors</span>
            <Divider />
            {_.map(data.contributors, (contributor, index) => {
              if (index === data.contributors.length - 1) {
                return (
                  <span className="bp5-text-muted" key={contributor.email}>
                    {contributor.name}
                  </span>
                );
              }
              return (
                <span className="bp5-text-muted" key={contributor.email}>
                  {contributor.name},{" "}
                </span>
              );
            })}
          </>
        ) : (
          <>
            <span>Maintainers</span>
            <Divider />
            {_.map(data.maintainers, (maintainer, index) => {
              if (index === data.maintainers.length - 1) {
                return (
                  <span className="bp5-text-muted" key={maintainer.email}>
                    {maintainer.name}
                  </span>
                );
              }
              return (
                <span className="bp5-text-muted" key={maintainer.email}>
                  {maintainer.name},{" "}
                </span>
              );
            })}
          </>
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
