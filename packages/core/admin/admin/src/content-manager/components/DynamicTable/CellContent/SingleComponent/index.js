import React from 'react';
import PropTypes from 'prop-types';
import { Flex } from '@strapi/design-system/Flex';
import { Tooltip } from '@strapi/design-system/Tooltip';
import { Typography } from '@strapi/design-system/Typography';
import { stopPropagation } from '@strapi/helper-plugin';

const SingleComponentCell = ({ value, metadatas }) => {
  const { mainField } = metadatas;
  const content = value?.[mainField];

  if (!content?.length) {
    return '-';
  }

  return (
    <Flex {...stopPropagation}>
      <Tooltip label={content}>
        <Typography textColor="neutral800" ellipsis>
          {content}
        </Typography>
      </Tooltip>
    </Flex>
  );
};

SingleComponentCell.propTypes = {
  metadatas: PropTypes.shape({
    mainField: PropTypes.string.isRequired,
  }).isRequired,
  value: PropTypes.object.isRequired,
};

export default SingleComponentCell;
