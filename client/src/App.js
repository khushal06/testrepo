import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import {
  ThemeProvider,
  createTheme,
  Box,
  Button,
  TextField,
  Paper,
  Typography,
  Grid,
  Container,
  ToggleButton,
  ToggleButtonGroup,
  Card,
  CardContent,
  IconButton,
  Tooltip as MuiTooltip
} from '@mui/material';
import {
  Calculate,
  Functions,
  History,
  Clear,
  Backspace,
  Add,
  Remove,
  Close,
  ExitToApp
} from '@mui/icons-material';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Create dark theme
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00ff00',
      light: '#4caf50',
      dark: '#2e7d32'
    },
    secondary: {
      main: '#ff9800',
      light: '#ffb74d',
      dark: '#f57c00'
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e'
    },
    text: {
      primary: '#ffffff',
      secondary: '#b3b3b3'
    }
  },
  typography: {
    fontFamily: 'Roboto, monospace',
    h1: {
      fontWeight: 700
    },
    h2: {
      fontWeight: 600
    },
    h3: {
      fontWeight: 600
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
          minHeight: 48
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16
        }
      }
    }
  }
});

function App() {
  const [display, setDisplay] = useState('0');
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');
  const [isGraphMode, setIsGraphMode] = useState(false);
  const [graphData, setGraphData] = useState(null);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // TI-84 style button configuration with MUI styling
  const buttons = [
    [
      { text: '2ND', type: 'function', action: '2nd', color: 'secondary', variant: 'contained' },
      { text: 'MODE', type: 'function', action: 'mode', color: 'secondary', variant: 'contained' },
      { text: 'DEL', type: 'function', action: 'del', color: 'secondary', variant: 'contained' },
      { text: 'INS', type: 'function', action: 'ins', color: 'secondary', variant: 'contained' },
      { text: 'CLEAR', type: 'clear', action: 'clear', color: 'error', variant: 'contained' }
    ],
    [
      { text: 'Y=', type: 'function', action: 'y=', color: 'primary', variant: 'contained' },
      { text: 'WINDOW', type: 'function', action: 'window', color: 'primary', variant: 'contained' },
      { text: 'ZOOM', type: 'function', action: 'zoom', color: 'primary', variant: 'contained' },
      { text: 'TRACE', type: 'function', action: 'trace', color: 'primary', variant: 'contained' },
      { text: 'GRAPH', type: 'graph', action: 'graph', color: 'success', variant: 'contained' }
    ],
    [
      { text: 'sin', type: 'function', action: 'sin', color: 'info', variant: 'contained' },
      { text: 'cos', type: 'function', action: 'cos', color: 'info', variant: 'contained' },
      { text: 'tan', type: 'function', action: 'tan', color: 'info', variant: 'contained' },
      { text: 'log', type: 'function', action: 'log', color: 'info', variant: 'contained' },
      { text: 'ln', type: 'function', action: 'ln', color: 'info', variant: 'contained' }
    ],
    [
      { text: '√', type: 'function', action: 'sqrt', color: 'info', variant: 'contained' },
      { text: 'x²', type: 'function', action: 'square', color: 'info', variant: 'contained' },
      { text: 'x³', type: 'function', action: 'cube', color: 'info', variant: 'contained' },
      { text: 'xʸ', type: 'function', action: 'power', color: 'info', variant: 'contained' },
      { text: 'π', type: 'constant', action: 'pi', color: 'success', variant: 'contained' }
    ],
    [
      { text: '7', type: 'number', action: '7', color: 'default', variant: 'outlined' },
      { text: '8', type: 'number', action: '8', color: 'default', variant: 'outlined' },
      { text: '9', type: 'number', action: '9', color: 'default', variant: 'outlined' },
      { text: '÷', type: 'operator', action: '÷', color: 'warning', variant: 'contained' },
      { text: '⌫', type: 'backspace', action: 'backspace', color: 'warning', variant: 'contained' }
    ],
    [
      { text: '4', type: 'number', action: '4', color: 'default', variant: 'outlined' },
      { text: '5', type: 'number', action: '5', color: 'default', variant: 'outlined' },
      { text: '6', type: 'number', action: '6', color: 'default', variant: 'outlined' },
      { text: '×', type: 'operator', action: '×', color: 'warning', variant: 'contained' },
      { text: 'HIST', type: 'history', action: 'history', color: 'info', variant: 'contained' }
    ],
    [
      { text: '1', type: 'number', action: '1', color: 'default', variant: 'outlined' },
      { text: '2', type: 'number', action: '2', color: 'default', variant: 'outlined' },
      { text: '3', type: 'number', action: '3', color: 'default', variant: 'outlined' },
      { text: '-', type: 'operator', action: '-', color: 'warning', variant: 'contained' },
      { text: 'ENTER', type: 'equals', action: 'equals', color: 'primary', variant: 'contained' }
    ],
    [
      { text: '0', type: 'number', action: '0', color: 'default', variant: 'outlined' },
      { text: '.', type: 'decimal', action: '.', color: 'default', variant: 'outlined' },
      { text: '(-)', type: 'function', action: 'negative', color: 'default', variant: 'outlined' },
      { text: '+', type: 'operator', action: '+', color: 'warning', variant: 'contained' },
      { text: 'STO→', type: 'function', action: 'store', color: 'secondary', variant: 'contained' }
    ]
  ];

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const response = await axios.get('/api/history?limit=20');
      if (response.data.success) {
        setHistory(response.data.history);
      }
    } catch (error) {
      console.error('Error loading history:', error);
    }
  };

  const handleButtonClick = (action) => {
    setError('');
    
    switch (action) {
      case 'clear':
        setDisplay('0');
        setExpression('');
        setResult('');
        setIsGraphMode(false);
        setGraphData(null);
        break;
        
      case 'backspace':
      case 'del':
        if (display.length === 1) {
          setDisplay('0');
          setExpression('');
        } else {
          const newDisplay = display.slice(0, -1);
          setDisplay(newDisplay);
          setExpression(newDisplay);
        }
        break;
        
      case 'equals':
      case 'enter':
        calculateResult();
        break;
        
      case 'graph':
        if (expression.trim()) {
          generateGraph();
        } else {
          setError('Please enter a function to graph');
        }
        break;
        
      case 'history':
        setShowHistory(!showHistory);
        break;
        
      case 'pi':
        setDisplay('π');
        setExpression(expression + 'π');
        break;
        
      case 'sin':
      case 'cos':
      case 'tan':
      case 'log':
      case 'ln':
        setDisplay(action);
        setExpression(expression + action);
        break;
        
      case 'sqrt':
        setDisplay('√');
        setExpression(expression + '√');
        break;
        
      case 'square':
        setDisplay('x²');
        setExpression(expression + 'x²');
        break;
        
      case 'cube':
        setDisplay('x³');
        setExpression(expression + 'x³');
        break;
        
      case 'power':
        setDisplay('xʸ');
        setExpression(expression + 'xʸ');
        break;
        
      case 'negative':
        if (display === '0') {
          setDisplay('-');
          setExpression('-');
        } else {
          setDisplay('-' + display);
          setExpression('-' + expression);
        }
        break;
        
      default:
        if (display === '0' && action !== '.') {
          setDisplay(action);
          setExpression(action);
        } else {
          setDisplay(display + action);
          setExpression(expression + action);
        }
        break;
    }
  };

  const calculateResult = async () => {
    if (!expression.trim()) return;
    
    setIsLoading(true);
    try {
      const response = await axios.post('/api/calculate', {
        formula: expression
      });
      
      if (response.data.success) {
        setResult(response.data.result);
        setDisplay(response.data.result);
        setExpression(response.data.result);
        await loadHistory();
      }
    } catch (error) {
      setError(error.response?.data?.error || 'Calculation error');
      console.error('Calculation error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const generateGraph = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post('/api/graph', {
        functionString: expression,
        xMin: -10,
        xMax: 10,
        points: 200
      });
      
      if (response.data.success) {
        const chartData = {
          labels: response.data.coordinates.map(coord => coord.x),
          datasets: [
            {
              label: response.data.function,
              data: response.data.coordinates.map(coord => coord.y),
              borderColor: '#00ff00',
              backgroundColor: 'rgba(0, 255, 0, 0.1)',
              borderWidth: 2,
              pointRadius: 0,
              tension: 0.1
            }
          ]
        };
        
        setGraphData(chartData);
        setIsGraphMode(true);
      }
    } catch (error) {
      setError(error.response?.data?.error || 'Graphing error');
      console.error('Graphing error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: false
      }
    },
    scales: {
      x: {
        display: true,
        title: {
          display: false
        },
        grid: { color: 'rgba(128, 128, 128, 0.3)' },
        ticks: { color: '#00ff00', font: { size: 10 } }
      },
      y: {
        display: true,
        title: {
          display: false
        },
        grid: { color: 'rgba(128, 128, 128, 0.3)' },
        ticks: { color: '#00ff00', font: { size: 10 } }
      }
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
          py: 4
        }}
      >
        <Container maxWidth="xl">
          {/* Header */}
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Paper
              elevation={8}
              sx={{
                display: 'inline-block',
                px: 6,
                py: 2,
                borderRadius: '16px 16px 0 0',
                border: '2px solid',
                borderColor: 'grey.600',
                background: 'linear-gradient(135deg, #424242 0%, #616161 100%)'
              }}
            >
              <Typography variant="h3" component="h1" color="primary" sx={{ fontWeight: 700, fontFamily: 'monospace' }}>
                TI-84 Plus CE
              </Typography>
              <Typography variant="body1" color="grey.300" sx={{ fontFamily: 'monospace' }}>
                Graphing Calculator
              </Typography>
            </Paper>
          </Box>
          
          <Grid container spacing={4}>
            {/* Calculator Section */}
            <Grid item xs={12} lg={6}>
              <Paper
                elevation={12}
                sx={{
                  p: 4,
                  borderRadius: 4,
                  border: '4px solid',
                  borderColor: 'grey.600',
                  background: 'linear-gradient(135deg, #424242 0%, #616161 100%)'
                }}
              >
                {/* Display Area */}
                <Paper
                  elevation={8}
                  sx={{
                    p: 3,
                    mb: 4,
                    borderRadius: 3,
                    border: '2px solid',
                    borderColor: 'grey.500',
                    backgroundColor: '#000000'
                  }}
                >
                  <Box sx={{ textAlign: 'right' }}>
                    <Typography
                      variant="caption"
                      color="primary"
                      sx={{ display: 'block', mb: 1, fontFamily: 'monospace' }}
                    >
                      {isGraphMode ? 'GRAPH MODE' : 'CALC MODE'}
                    </Typography>
                    
                    <TextField
                      fullWidth
                      variant="standard"
                      value={display}
                      InputProps={{
                        readOnly: true,
                        style: {
                          color: '#00ff00',
                          fontSize: '1.5rem',
                          fontWeight: 'bold',
                          fontFamily: 'monospace',
                          textAlign: 'right'
                        }
                      }}
                      sx={{
                        '& .MuiInput-underline:before': { borderBottom: 'none' },
                        '& .MuiInput-underline:after': { borderBottom: 'none' },
                        '& .MuiInput-underline:hover:not(.Mui-disabled):before': { borderBottom: 'none' }
                      }}
                    />
                    
                    {expression && expression !== display && (
                      <Typography
                        variant="body1"
                        color="primary"
                        sx={{
                          mt: 2,
                          opacity: 0.7,
                          fontFamily: 'monospace',
                          textAlign: 'right'
                        }}
                      >
                        {expression}
                      </Typography>
                    )}
                    
                    {result && (
                      <Typography
                        variant="h6"
                        color="primary"
                        sx={{
                          mt: 2,
                          fontWeight: 'bold',
                          fontFamily: 'monospace',
                          textAlign: 'right'
                        }}
                      >
                        = {result}
                      </Typography>
                    )}
                    
                    {error && (
                      <Typography
                        variant="body2"
                        color="error"
                        sx={{ mt: 2, fontFamily: 'monospace', textAlign: 'right' }}
                      >
                        ERROR: {error}
                      </Typography>
                    )}
                    
                    {isLoading && (
                      <Typography
                        variant="body2"
                        color="warning.main"
                        sx={{ mt: 2, fontFamily: 'monospace', textAlign: 'right' }}
                      >
                        Processing...
                      </Typography>
                    )}
                  </Box>
                </Paper>
                
                {/* Keypad */}
                <Grid container spacing={1}>
                  {buttons.map((row, rowIndex) => (
                    <Grid item xs={12} key={rowIndex}>
                      <Grid container spacing={1}>
                        {row.map((button, colIndex) => (
                          <Grid item xs key={colIndex}>
                            <Button
                              fullWidth
                              variant={button.variant}
                              color={button.color}
                              onClick={() => handleButtonClick(button.action)}
                              disabled={isLoading}
                              sx={{
                                minHeight: 56,
                                fontWeight: 'bold',
                                fontSize: '0.875rem',
                                border: button.variant === 'outlined' ? '2px solid' : 'none',
                                borderColor: 'grey.500'
                              }}
                            >
                              {button.text}
                            </Button>
                          </Grid>
                        ))}
                      </Grid>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            </Grid>
            
            {/* Right Panel - Graph or History */}
            <Grid item xs={12} lg={6}>
              <Paper
                elevation={12}
                sx={{
                  p: 4,
                  borderRadius: 4,
                  border: '4px solid',
                  borderColor: 'grey.600',
                  background: 'linear-gradient(135deg, #424242 0%, #616161 100%)'
                }}
              >
                {isGraphMode && graphData ? (
                  <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                      <Typography variant="h4" color="primary" sx={{ fontWeight: 'bold', fontFamily: 'monospace' }}>
                        GRAPH
                      </Typography>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => setIsGraphMode(false)}
                        startIcon={<ExitToApp />}
                        sx={{ fontWeight: 'bold' }}
                      >
                        EXIT
                      </Button>
                    </Box>
                    
                    <Paper
                      elevation={8}
                      sx={{
                        p: 3,
                        borderRadius: 3,
                        border: '2px solid',
                        borderColor: 'grey.500',
                        backgroundColor: '#000000'
                      }}
                    >
                      <Typography variant="body2" color="primary" sx={{ mb: 2, fontFamily: 'monospace' }}>
                        Y=
                      </Typography>
                      <Typography variant="body1" color="primary" sx={{ mb: 3, fontFamily: 'monospace' }}>
                        {expression}
                      </Typography>
                      
                      <Box sx={{ height: 320, backgroundColor: '#000000' }}>
                        <Line data={graphData} options={chartOptions} />
                      </Box>
                    </Paper>
                  </Box>
                ) : showHistory ? (
                  <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                      <Typography variant="h4" color="primary" sx={{ fontWeight: 'bold', fontFamily: 'monospace' }}>
                        HISTORY
                      </Typography>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => setShowHistory(false)}
                        startIcon={<Close />}
                        sx={{ fontWeight: 'bold' }}
                      >
                        EXIT
                      </Button>
                    </Box>
                    
                    <Paper
                      elevation={8}
                      sx={{
                        p: 3,
                        borderRadius: 3,
                        border: '2px solid',
                        borderColor: 'grey.500',
                        backgroundColor: '#000000',
                        maxHeight: 320,
                        overflow: 'auto'
                      }}
                    >
                      {history.length > 0 ? (
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                          {history.map((item, index) => (
                            <Box
                              key={index}
                              sx={{
                                borderBottom: '1px solid',
                                borderColor: 'grey.600',
                                pb: 2
                              }}
                            >
                              <Typography variant="body2" color="primary" sx={{ fontFamily: 'monospace' }}>
                                {item.formula}
                              </Typography>
                              <Typography variant="body1" color="primary" sx={{ fontWeight: 'bold', fontFamily: 'monospace' }}>
                                = {item.result}
                              </Typography>
                              <Typography variant="caption" color="grey.400" sx={{ fontFamily: 'monospace' }}>
                                {new Date(item.timestamp).toLocaleString()}
                              </Typography>
                            </Box>
                          ))}
                        </Box>
                      ) : (
                        <Box sx={{ textAlign: 'center', py: 6 }}>
                          <Typography variant="h1" sx={{ mb: 2 }}>📝</Typography>
                          <Typography variant="body1" sx={{ fontFamily: 'monospace' }}>
                            No calculations yet
                          </Typography>
                          <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                            Start calculating to see your history!
                          </Typography>
                        </Box>
                      )}
                    </Paper>
                  </Box>
                ) : (
                  <Box sx={{ textAlign: 'center', py: 10 }}>
                    <Typography variant="h1" sx={{ mb: 3 }}>📊</Typography>
                    <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold', fontFamily: 'monospace' }}>
                      READY
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 4, fontFamily: 'monospace' }}>
                      Enter a function and press GRAPH
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, alignItems: 'center' }}>
                      <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                        Try: <Box component="span" color="primary.main">sin(x)</Box>
                      </Typography>
                      <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                        Or: <Box component="span" color="primary.main">x² + 2x - 1</Box>
                      </Typography>
                      <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                        Or: <Box component="span" color="primary.main">2*π*r</Box>
                      </Typography>
                    </Box>
                  </Box>
                )}
              </Paper>
            </Grid>
          </Grid>
          
          {/* Footer */}
          <Box sx={{ textAlign: 'center', mt: 6 }}>
            <Typography variant="body2" color="grey.400" sx={{ fontFamily: 'monospace' }}>
              TI-84 Plus CE Emulator • React + Node.js + SQLite • MUI Components
            </Typography>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
