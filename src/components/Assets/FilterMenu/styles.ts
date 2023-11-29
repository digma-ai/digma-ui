import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px;
  box-shadow: 0 2px 16px rgb(0 0 0 / 36%);
  border-radius: 4px;
  width: 217px;
  height: 177px;
  background: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#fbfdff";
      case "dark":
      case "dark-jetbrains":
        return "#2b2d30";
    }
  }};
`;

export const Header = styled.div`
  font-size: 14px;
  font-weight: 500;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#494b57";
      case "dark":
      case "dark-jetbrains":
        return "#dfe1e5";
    }
  }};
`;

export const CloseButton = styled.button`
  padding: 0;
  cursor: pointer;
  background: none;
  border: none;
  height: 14px;
  color: inherit;
`;

export const DeleteTagButton = CloseButton;

export const SearchInputContainer = styled.div`
  display: flex;
  position: relative;
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#4d668a";
      case "dark":
      case "dark-jetbrains":
        return "#dadada";
    }
  }};

  &:focus,
  &:hover {
    color: ${({ theme }) => {
      switch (theme.mode) {
        case "light":
          return "#7891d0";
        case "dark":
        case "dark-jetbrains":
          return "#dfe1e5";
      }
    }};
  }
`;

export const SearchInputIconContainer = styled.div`
  display: flex;
  align-items: center;
  margin: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 8px;
`;

export const SearchInput = styled.input`
  font-size: 14px;
  padding: 4px 8px 4px 24px;
  border-radius: 4px;
  outline: none;
  width: 100%;
  background: transparent;
  color: inherit;
  border: 1px solid
    ${({ theme }) => {
      switch (theme.mode) {
        case "light":
          return "#d0d6eb";
        case "dark":
        case "dark-jetbrains":
          return "#4e5157";
      }
    }};

  &:focus,
  &:hover {
    color: inherit;
    border: 1px solid
      ${({ theme }) => {
        switch (theme.mode) {
          case "light":
            return "#7891d0";
          case "dark":
          case "dark-jetbrains":
            return "#dfe1e5";
        }
      }};
  }

  &::placeholder {
    color: ${({ theme }) => {
      switch (theme.mode) {
        case "light":
          return "#4d668a";
        case "dark":
        case "dark-jetbrains":
          return "#dadada";
      }
    }};
  }

  &:hover::placeholder {
    color: ${({ theme }) => {
      switch (theme.mode) {
        case "light":
          return "#7891d0";
        case "dark":
        case "dark-jetbrains":
          return "#dfe1e5";
      }
    }};
  }

  &:focus::placeholder {
    color: transparent;
  }
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
  gap: 8px;
  flex-grow: 1;
`;

export const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
`;

export const Tag = styled.div`
  display: flex;
  border-radius: 2px;
  align-items: center;
  gap: 4px;
  background: rgba(53 56 205 / 50%);
  font-size: 14px;
  padding: 4px;
  color: #dfe1e5;
  max-width: 100%;
  box-sizing: border-box;
`;

export const TagText = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
`;

export const ListItem = styled.li`
  flex-direction: row;
  width: 100%;
  box-sizing: border-box;
  list-style-type: none;
`;

export const EmptyStateContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
`;
