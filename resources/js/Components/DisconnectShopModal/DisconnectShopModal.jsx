import {Button, Modal, Frame} from '@shopify/polaris';
import {useState, useCallback} from 'react';

function DisconnectShop() {
  const [active, setActive] = useState(false);
  const [buttonText,setButtonText] = useState("Disconnected");

  const toggleModal = useCallback(() => setActive((active) => !active), []);

  const activator = <Button onClick={toggleModal} >{buttonText}</Button>;

  return (
        <Modal
          activator={activator}
          open={active}
          onClose={toggleModal}
          title="Disconnect Tiktok Shop"
          primaryAction={{
            destructive: true,
            content: 'Disconnect',
            onAction: toggleModal,
          }}
        >
          <Modal.Section>
          Once disconnected, your Tiktok shop will no longer be synced with Shopify.
          </Modal.Section>
        </Modal>
  );
}
export default DisconnectShop;