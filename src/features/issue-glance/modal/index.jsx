import ForgeUI, { ModalDialog, Form, TextArea, Fragment } from "@forge/ui";

import { DEFAULT_NOTIFY_BODY } from "../../../utils/constants";

const Modal = ({ modalIsOpen, hideModal, notifyAssignee }) => {
  return (
    <Fragment>
      {modalIsOpen && (
        <ModalDialog
          header="Notify assignee about this issue"
          closeButtonText="Close"
          onClose={hideModal}
        >
          <Form onSubmit={notifyAssignee} submitButtonText="Send">
            <TextArea
              isRequired
              spellCheck
              name="notifyBody"
              defaultValue={DEFAULT_NOTIFY_BODY}
            />
          </Form>
        </ModalDialog>
      )}
    </Fragment>
  );
};

export default Modal;
