import React from 'react';
import { Button, Ref } from 'semantic-ui-react';
import { BlockChooser, Icon } from '@plone/volto/components';
import { usePopper } from 'react-popper';
import { Portal } from 'react-portal';
import addSVG from '@plone/volto/icons/add.svg';

const OpenedBlocksChooser = (props) => {
  const { blocksConfig, block, onInsertBlock } = props;

  const ref = React.useRef(null);

  function handleClickOutside(event) {
    if (ref.current && !ref.current.contains(event.target)) {
      props.setOpenMenu(false);
    }
  }

  React.useEffect(() => {
    document.body.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.body.removeEventListener('mousedown', handleClickOutside);
    };
  });

  return (
    <BlockChooser
      onInsertBlock={onInsertBlock}
      currentBlock={block}
      showRestricted
      blocksConfig={blocksConfig}
      ref={ref}
    />
  );
};

const NewBlockAddButton = (props) => {
  const { index } = props;
  const [isOpenMenu, setOpenMenu] = React.useState(false);

  const [referenceElement, setReferenceElement] = React.useState(null);
  const [popperElement, setPopperElement] = React.useState(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'left',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 0],
        },
      },
      {
        name: 'flip',
      },
    ],
  });

  return (
    <>
      <Ref innerRef={setReferenceElement}>
        <Button
          basic
          icon
          onClick={() => setOpenMenu(true)}
          className="add-block-button"
          aria-label={`Add block in position ${index}`}
        >
          <Icon name={addSVG} className="circled" size="19px" />
        </Button>
      </Ref>
      <Portal node={document.getElementById('body')}>
        <div
          ref={setPopperElement}
          style={styles.popper}
          {...attributes.popper}
          className="accordion-chooser"
        >
          {isOpenMenu ? (
            <OpenedBlocksChooser {...props} setOpenMenu={setOpenMenu} />
          ) : null}
        </div>
      </Portal>
    </>
  );
};

export default NewBlockAddButton;
