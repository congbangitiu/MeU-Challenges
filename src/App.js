import './App.css';
import Button from './Button'
import Input from './Input';
import TodoApp from './TodoApp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCartPlus, faLock, faPhone
} from '@fortawesome/free-solid-svg-icons';
import QuoteGeneratorApp from './QuoteGeneratorApp/QuoteGeneratorApp';


function App() {
  return (
    <>
      <p className='comment'> BUTTON COMPONENT</p>
      <p className='comment'> Button in normal form</p>
      <Button children={'Default'} defaultMode/>
      <hr />
      <p className='comment'> Button has outline property</p>
      <Button children={'Default'} variant="outline"/>
      <hr />
      <p className='comment'> Button has text property</p>
      <Button children={'Default'} variant="text"/>

      <hr />
      <p className='comment'> Button has disableShadow property</p>
      <Button children={'Default'} disableShadow/>
      <hr />
      <p className='comment'> Button has disabled property</p>
      <Button children={'Disabled'} disabled/>

      <hr />
      <p className='comment'> Button has disable and text property</p>
      <Button children={'Default'} variant="text" disabled/>
 
      <hr />
      <p className='comment'> Button has startIcon property</p>
      <Button children={'Default'} startIcon={<FontAwesomeIcon icon={faCartPlus} />} />

      <hr />
      <p className='comment'> Button has endIcon property</p>
      <Button children={'Default'} endIcon={<FontAwesomeIcon icon={faCartPlus} />} />

      <hr />
      <p className='comment'> Button has sm property</p>
      <Button children={'Default'} size='sm' />
      <p className='comment'> Button has md property</p>
      <Button children={'Default'} size='md' />
      <p className='comment'> Button has lg property</p>
      <Button children={'Default'} size='lg' />

      <hr />
      <p className='comment'> Button has default property</p>
      <Button children={'Default'} color='default' />
      <p className='comment'> Button has primary property</p>
      <Button children={'Default'} color='primary' />
      <p className='comment'> Button has secondary property</p>
      <Button children={'Secondary'} color='secondary' />
      <p className='comment'> Button has danger property</p>
      <Button children={'Danger'} color='danger' />

      <hr />
      <hr />
      <hr />
      <p className='comment'> INPUT COMPONENT</p>
      <p className='comment'> Input has default property</p>
      <Input children={"Placeholder"} defaultMode />
      <hr />
      <p className='comment'> Input has error property</p>
      <Input children={"Placeholder"} error />
      <hr />
      <p className='comment'> Input has disabled property</p>
      <Input children={"Disabled"} disabled />
      <hr />
      <p className='comment'> Input has helperText property</p>
      <Input children={"Placeholder"} helperText='Some interesting text' />
      <hr />
      <p className='comment'> Input has helperText and error property</p>
      <Input children={"Placeholder"} helperText='Some interesting text' error />

      <hr />
      <p className='comment'> Input has startIcon property</p>
      <Input children={"Placeholder"} startIcon={<FontAwesomeIcon icon={faPhone} />} />
      <hr />
      <p className='comment'> Input has endIcon property</p>
      <Input children={"Placeholder"} endIcon={<FontAwesomeIcon icon={faLock} />}/>
      <hr />
      <p className='comment'> Input has value='text' property</p>
      <Input children={"Text"} value='text' />
      <hr />
      <p className='comment'> Input has size='sm' property</p>
      <Input children={"Placeholder"} size='sm' />
      <hr />
      <p className='comment'> Input has size='md' property</p>
      <Input children={"Placeholder"} size='md' />
      <hr />
      <p className='comment'> Input has fullWidth property</p>
      <Input children={"Text"} fullWidth />
      <hr />
      <p className='comment'> Input has multiline row='4' property</p>
      <Input children={"Placeholder"} multiline row='row-4' />

      <hr />
      <hr />
      <hr />

      <TodoApp />

      <hr />
      <hr />
      <hr />

      <QuoteGeneratorApp />

      <br />
      <br />
      <br />
      <br />
      <br />
    </>
  );
}

export default App;
