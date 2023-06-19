import { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { Box, InputLabel, Select, MenuItem, FormControl, Tooltip, IconButton, SelectChangeEvent } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import Stack from '@mui/material/Stack';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';

interface BodyProps {
  toggleDarkMode: () => void;
  darkMode: boolean;
}

function Body({ toggleDarkMode, darkMode }: BodyProps) {
  const [numEditorRows, setNumEditorRows] = useState<number>(1);
  const [numEditorsPerRow, setNumEditorsPerRow] = useState<number>(1);
  const [editorLanguage, setEditorLanguage] = useState<string>('markdown');

  useEffect(() => {
    setNumEditorRows(localStorage.getItem('numEditorRows') ? Number(localStorage.getItem('numEditorRows')) : 1);
    setNumEditorsPerRow(localStorage.getItem('numEditorsPerRow') ? Number(localStorage.getItem('numEditorsPerRow')) : 1);
    setEditorLanguage(localStorage.getItem('editorLanguage') || 'markdown');
  }, []);

  // Save settings and contents to local storage whenever they change
  const handleNumEditorRowsChange = (event: SelectChangeEvent) => {
    setNumEditorRows(Number(event.target.value));
    localStorage.setItem('numEditorRows', event.target.value);
  };

  const handleNumEditorsPerRowChange = (event: SelectChangeEvent) => {
    setNumEditorsPerRow(Number(event.target.value));
    localStorage.setItem('numEditorsPerRow', event.target.value);
  };

  const handleEditorLanguageChange = (event: SelectChangeEvent) => {
    localStorage.setItem('editorLanguage', event.target.value);
    setEditorLanguage(event.target.value);
  };

  return (
    <Stack sx={{ padding: '15px 10px 10px', display: 'flex', flexDirection: 'column', height: "100vh" }} spacing="10px" flexGrow={1}>
      <Box sx={{ display: 'flex', gridGap: '10px' }}>
        <FormControl fullWidth size="small">
          <InputLabel id="num-editor-rows-label"># Editor Rows</InputLabel>
          <Select
            labelId="num-editor-rows-label"
            id="num-editor-rows"
            value={numEditorRows.toString()}
            onChange={handleNumEditorRowsChange}
            label="# Editor Rows"
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth size="small">
          <InputLabel id="num-editors-per-row-label"># Editors per Row</InputLabel>
          <Select
            labelId="num-editors-per-row-label"
            id="num-editors-per-row"
            value={numEditorsPerRow.toString()}
            onChange={handleNumEditorsPerRowChange}
            label="# Editors per Row"
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth size="small">
          <InputLabel id="editor-language-label">Language</InputLabel>
          <Select
            labelId="editor-language-label"
            id="editor-language"
            label="Language"
            value={editorLanguage}
            onChange={handleEditorLanguageChange}
          >
            <MenuItem value={'markdown'}>Markdown</MenuItem>
            <MenuItem value={'javascript'}>JavaScript</MenuItem>
            <MenuItem value={'typescript'}>TypeScript</MenuItem>
            <MenuItem value={'csharp'}>C#</MenuItem>
            <MenuItem value={'java'}>Java</MenuItem>
            <MenuItem value={'cpp'}>C++</MenuItem>
            <MenuItem value={'rust'}>Rust</MenuItem>
            <MenuItem value={'python'}>Python</MenuItem>
            <MenuItem value={'ruby'}>Ruby</MenuItem>
            <MenuItem value={'html'}>HTML</MenuItem>
          </Select>
        </FormControl>
        <Tooltip title={darkMode ? "Switch to light mode" : "Switch to dark mode"}>
          <IconButton onClick={toggleDarkMode}>
            {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        </Tooltip>
      </Box>
      <Stack sx={{ height: "calc(100% - 70px)" }} flexDirection="column" flexGrow={1}>
        {Array.from({ length: Number(numEditorRows) }).map((_, i) =>
          <Grid2 sx={{ flex: 1 }} height={`${numEditorsPerRow === 2 ? "50%" : "100%"}`}>
            {Array.from({ length: Number(numEditorsPerRow) }).map((_, j) => (
              <Grid2 key={`editor-${i * Number(numEditorsPerRow) + j}`} sx={{ height: '100%', border: 1, borderColor: 'grey.500' }} width={`${numEditorsPerRow === 2 ? "50%" : "100%"}`} display="inline-block">
                <Editor
                  options={{
                    minimap: { enabled: false }, automaticLayout: true, glyphMargin: false, lineNumbersMinChars: 2, lineDecorationsWidth: 5
                  }}
                  language={editorLanguage}
                  //value={editorContents[i * numEditorsPerRow + j] || ''}
                  theme={darkMode ? 'vs-dark' : 'vs-light'}
                  defaultValue={localStorage.getItem(`editor-${i * 2 + j}`) || ''}
                  onChange={(value) => localStorage.setItem(`editor-${i * 2 + j}`, value || '')}
                />
              </Grid2>
            ))}
          </Grid2>
        )}
      </Stack>
    </Stack>
  );
}

export default Body;
