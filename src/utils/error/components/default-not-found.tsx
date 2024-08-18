import {useNavigate} from 'react-router-dom';
import styled from '@emotion/styled';

export const DefaultNotFound = () => {
  const navigate = useNavigate();

  const navigateHome = () => {
    navigate('/');
  };
  return (
    <DefaultNotFoundLayout>
      <h2 >
        페이지를 찾을 수 없습니다
      </h2>

      <button onClick={navigateHome}>
        메인 페이지
      </button>
    </DefaultNotFoundLayout>
  );
};

const DefaultNotFoundLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  gap: 20px;
`;
