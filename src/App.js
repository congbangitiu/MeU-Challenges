import './App.css';
import Button from './Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCartPlus
} from '@fortawesome/free-solid-svg-icons';


function App() {
  return (
    <>
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
    </>
  );
}

export default App;
