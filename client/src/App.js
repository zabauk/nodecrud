import './App.css';
import CreatePost from './components/post/CreatePost';
import { Container } from 'react-bootstrap';

function App() {
  return (
    <div className="App">
      <Container className="mt-4">
        <div className="row justify-content-center">
            <div className="col-md-6">
                <CreatePost />
            </div>
        </div>
      </Container>
    </div>
  );
}

export default App;
