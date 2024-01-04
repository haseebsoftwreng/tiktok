  
import {Button, Form, FormLayout,TextField} from '@shopify/polaris';
import {useState, useCallback} from 'react';
import React from 'react';

export default function Contact() {

    //Name field data
    const [nameSet, setnameSet] = useState('');

    const handelNameChange = useCallback(
      (value) => setnameSet(value),
      [],
    );
    //Email field data
    const [emailSet, setEmailSet] = useState('');

    const handelEmailChange = useCallback(
      (value) => setEmailSet(value),
      [],
    );
    //Subject field data
    const [SubjectSet, setSubjectSet] = useState('');

    const handelSubjectChange = useCallback(
      (value) => setSubjectSet(value),
      [],
    );
     //Message field data
     const [Message, setMessage] = useState('');

     const handleMessageChange = useCallback(
       (value) => setMessage(value),
       [],
     );

  return (
   <>
    <Form>
        <FormLayout>
        <FormLayout.Group>
        <TextField
          type="text"
          label="Name"
          value={nameSet}
          onChange={handelNameChange}
          autoComplete="off"
          requiredIndicator
        />
        <TextField
          type="email"
          label="Email"
          value={emailSet}
          onChange={handelEmailChange}
          autoComplete="off"
          requiredIndicator
        />
        </FormLayout.Group>
        <TextField
          type="text"
          label="Subject"
          value={SubjectSet}
          onChange={handelSubjectChange}
          autoComplete="off"
          requiredIndicator
        />
        <TextField
        label="Message"
        type='text'
        value={Message}
        onChange={handleMessageChange}
        autoComplete="off"
        multiline={6}
      />
        <Button submit>submit</Button>
        </FormLayout>
    </Form>
        
    </>
  );
}