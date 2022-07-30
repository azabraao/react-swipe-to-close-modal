# React Swipe To Close Modal

A React Modal component that closes on swipe touch ✨

## Installation

```bash
npm install react-swipe-to-close-modal
```

## Usage

```javascript
import Modal from "react-swipe-to-close-modal";

const NiceComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  const close = () => setIsOpen(false);

  return (
    <Modal isOpen={isOpen} close={close}>
      // your UI code here
    </Modal>
  );
};
```
