import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Flex } from '@strapi/design-system/Flex';
import { Box } from '@strapi/design-system/Box';
import { Tooltip } from '@strapi/design-system/Tooltip';
import { Typography } from '@strapi/design-system/Typography';
import { Popover } from '@strapi/design-system/Popover';
import { FocusTrap } from '@strapi/design-system/FocusTrap';
import { SortIcon, stopPropagation } from '@strapi/helper-plugin';

const Button = styled.button`
  svg {
    > g,
    path {
      fill: ${({ theme }) => theme.colors.neutral500};
    }
  }
  &:hover {
    svg {
      > g,
      path {
        fill: ${({ theme }) => theme.colors.neutral600};
      }
    }
  }
  &:active {
    svg {
      > g,
      path {
        fill: ${({ theme }) => theme.colors.neutral400};
      }
    }
  }
`;

const ActionWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${32 / 16}rem;
  width: ${32 / 16}rem;
  svg {
    height: ${4 / 16}rem;
  }
`;

const DEFAULT_CONTENT = '-';

const RepeatableComponentCell = ({ value, metadatas }) => {
  const [visible, setVisible] = useState(false);
  const buttonRef = useRef();

  const handleTogglePopover = () => setVisible(prev => !prev);

  if (!value?.length) {
    return DEFAULT_CONTENT;
  }

  const { mainField } = metadatas;

  return (
    <Flex {...stopPropagation}>
      <Tooltip label="Display repeatable values">
        <Button type="button" onClick={handleTogglePopover} ref={buttonRef}>
          <Flex>
            <Typography
              style={{ maxWidth: '252px', cursor: 'pointer' }}
              textColor="neutral800"
              ellipsis
            >
              {value[0][mainField] || DEFAULT_CONTENT}
            </Typography>
            <ActionWrapper>
              <SortIcon />

              {visible && (
                <Popover source={buttonRef} spacing={16} centered>
                  <FocusTrap onEscape={handleTogglePopover}>
                    <ul>
                      {value.map(entry => (
                        <Box key={entry.id} tabIndex={0} padding={3} as="li">
                          <Typography>{entry[mainField] || DEFAULT_CONTENT}</Typography>
                        </Box>
                      ))}
                    </ul>
                  </FocusTrap>
                </Popover>
              )}
            </ActionWrapper>
          </Flex>
        </Button>
      </Tooltip>
    </Flex>
  );
};

RepeatableComponentCell.propTypes = {
  metadatas: PropTypes.shape({
    mainField: PropTypes.string.isRequired,
  }).isRequired,
  value: PropTypes.array.isRequired,
};

export default RepeatableComponentCell;
