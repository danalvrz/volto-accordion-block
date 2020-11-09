import React from 'react';
import { Segment, Card } from 'semantic-ui-react';
import { Icon } from '@plone/volto/components';

export default ({ data, onChange, children, variants }) => {
  return (
    <Segment>
      <h4>Select Panels:</h4>
      <Card.Group centered itemsPerRow={3}>
        {variants.map(({ icon, defaultData, title }, index) => (
          <Card key={index} onClick={() => onChange(defaultData)}>
            <Card.Content>
              <Icon name={icon} size="55" />
              {title ? <p>{title}</p> : ''}
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
    </Segment>
  );
};
