import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { useAuth } from '../../hooks/auth';

import { photoURL } from '../../services';
import { getAllCharacters } from '../../services/characters';
import { CardContainer, Container, Input } from '../../styles/pages/home';

function Characters() {
  const [charactersList, setCharactersList] = useState([]);
  const [inputText, setInputText] = useState('');
  const [inputWithError, setInputWithError] = useState(false);
  const router = useRouter();
  const { user, logout } = useAuth();

  const findCharacters = async () => {
    try {
      const { data } = await getAllCharacters({ name: inputText });

      setCharactersList(data.characters);
    } catch (error) {
      alert('Error to find characters');
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (inputText === '') {
      findCharacters();
      return;
    }

    if (inputText.length < 3) {
      setInputWithError(true);
      return;
    }

    findCharacters();
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }
    findCharacters();
  }, []);

  return (
    <Container>
      <h1>Welcome, {user.name}</h1>
      <button type="button" onClick={logout}>
        Logout
      </button>
      {user.is_admin && (
        <button
          type="button"
          onClick={() => router.push('/characters/register')}
        >
          Add a character
        </button>
      )}
      <form onSubmit={onSubmit}>
        <Input
          inputWithError={inputWithError}
          type="text"
          placeholder="Search for a character"
          value={inputText}
          onChange={(e) => {
            setInputText(e.target.value);
            setInputWithError(false);
          }}
        />
      </form>
      <ul>
        {charactersList?.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </ul>
    </Container>
  );
}

function CharacterCard({ character }) {
  return (
    <CardContainer>
      <img
        alt={character.name}
        src={photoURL + character.photo}
        width="100%"
        height="70%"
      />
      <div>
        <h2>{character.name}</h2>
        {character.nickname && <h2>{`"${character.nickname}"`}</h2>}
      </div>
    </CardContainer>
  );
}

export default Characters;
