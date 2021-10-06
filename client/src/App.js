import './App.css';

import { Container } from 'react-bootstrap';
import AllPosts from './components/post/AllPosts';

function App() {
  return (
    <div className="App">
      <Container className="mt-4">
        <div className="row justify-content-center">
            <div className="col-md-6">
                <AllPosts />
            </div>
        </div>
      </Container>
    </div>
  );
}

export default App;
