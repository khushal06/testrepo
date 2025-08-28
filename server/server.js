const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const math = require('mathjs');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Database setup
const db = new sqlite3.Database('./calculator.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database');
    createTables();
  }
});

// Create database tables
function createTables() {
  const createHistoryTable = `
    CREATE TABLE IF NOT EXISTS calculation_history (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      formula TEXT NOT NULL,
      result TEXT NOT NULL,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `;
  
  const createFunctionsTable = `
    CREATE TABLE IF NOT EXISTS saved_functions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      function_name TEXT NOT NULL,
      function_string TEXT NOT NULL,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `;
  
  db.run(createHistoryTable, (err) => {
    if (err) {
      console.error('Error creating history table:', err.message);
    } else {
      console.log('History table created or already exists');
    }
  });
  
  db.run(createFunctionsTable, (err) => {
    if (err) {
      console.error('Error creating functions table:', err.message);
    } else {
      console.log('Functions table created or already exists');
    }
  });
}

// API Routes

// POST /api/calculate - Evaluate mathematical expressions
app.post('/api/calculate', (req, res) => {
  try {
    const { formula } = req.body;
    
    if (!formula || typeof formula !== 'string') {
      return res.status(400).json({ 
        error: 'Formula is required and must be a string' 
      });
    }
    
    // Clean and evaluate the formula using mathjs
    let cleanFormula = formula
      .replace(/×/g, '*')
      .replace(/÷/g, '/')
      .replace(/π/g, 'pi')
      .replace(/sin/g, 'sin')
      .replace(/cos/g, 'cos')
      .replace(/tan/g, 'tan')
      .replace(/log/g, 'log10')
      .replace(/ln/g, 'log')
      .replace(/√/g, 'sqrt');
    
    // Evaluate the mathematical expression
    const result = math.evaluate(cleanFormula);
    
    // Save to history
    const insertQuery = 'INSERT INTO calculation_history (formula, result) VALUES (?, ?)';
    db.run(insertQuery, [formula, result.toString()], function(err) {
      if (err) {
        console.error('Error saving to history:', err.message);
      }
    });
    
    res.json({ 
      result: result.toString(),
      formula: formula,
      success: true 
    });
    
  } catch (error) {
    console.error('Calculation error:', error.message);
    res.status(400).json({ 
      error: 'Invalid mathematical expression',
      details: error.message 
    });
  }
});

// POST /api/graph - Generate graph data for a function
app.post('/api/graph', (req, res) => {
  try {
    const { functionString, xMin = -10, xMax = 10, points = 200 } = req.body;
    
    if (!functionString || typeof functionString !== 'string') {
      return res.status(400).json({ 
        error: 'Function string is required and must be a string' 
      });
    }
    
    // Clean the function string
    let cleanFunction = functionString
      .replace(/×/g, '*')
      .replace(/÷/g, '/')
      .replace(/π/g, 'pi')
      .replace(/sin/g, 'sin')
      .replace(/cos/g, 'cos')
      .replace(/tan/g, 'tan')
      .replace(/log/g, 'log10')
      .replace(/ln/g, 'log')
      .replace(/√/g, 'sqrt')
      .replace(/\^/g, '**');
    
    // Generate x and y coordinates
    const coordinates = [];
    const step = (xMax - xMin) / points;
    
    for (let i = 0; i <= points; i++) {
      const x = xMin + i * step;
      
      try {
        // Replace 'x' with the actual value and evaluate
        const xValue = x;
        const scope = { x: xValue };
        const y = math.evaluate(cleanFunction, scope);
        
        // Only include valid, finite values
        if (isFinite(y) && !isNaN(y)) {
          coordinates.push({ 
            x: parseFloat(x.toFixed(4)), 
            y: parseFloat(y.toFixed(4)) 
          });
        }
      } catch (evalError) {
        // Skip invalid points
        continue;
      }
    }
    
    res.json({
      coordinates: coordinates,
      function: functionString,
      xRange: { min: xMin, max: xMax },
      points: coordinates.length,
      success: true
    });
    
  } catch (error) {
    console.error('Graphing error:', error.message);
    res.status(400).json({ 
      error: 'Error generating graph data',
      details: error.message 
    });
  }
});

// GET /api/history - Retrieve calculation history
app.get('/api/history', (req, res) => {
  const limit = req.query.limit || 50;
  const query = 'SELECT * FROM calculation_history ORDER BY timestamp DESC LIMIT ?';
  
  db.all(query, [limit], (err, rows) => {
    if (err) {
      console.error('Error retrieving history:', err.message);
      return res.status(500).json({ 
        error: 'Database error retrieving history' 
      });
    }
    
    res.json({ 
      history: rows,
      count: rows.length,
      success: true 
    });
  });
});

// POST /api/history - Save a new calculation to history
app.post('/api/history', (req, res) => {
  try {
    const { formula, result } = req.body;
    
    if (!formula || !result) {
      return res.status(400).json({ 
        error: 'Formula and result are required' 
      });
    }
    
    const insertQuery = 'INSERT INTO calculation_history (formula, result) VALUES (?, ?)';
    db.run(insertQuery, [formula, result], function(err) {
      if (err) {
        console.error('Error saving to history:', err.message);
        return res.status(500).json({ 
          error: 'Database error saving to history' 
        });
      }
      
      res.json({ 
        id: this.lastID,
        formula: formula,
        result: result,
        success: true 
      });
    });
    
  } catch (error) {
    console.error('History save error:', error.message);
    res.status(500).json({ 
      error: 'Error saving to history',
      details: error.message 
    });
  }
});

// GET /api/functions - Retrieve saved functions
app.get('/api/functions', (req, res) => {
  const query = 'SELECT * FROM saved_functions ORDER BY timestamp DESC';
  
  db.all(query, [], (err, rows) => {
    if (err) {
      console.error('Error retrieving functions:', err.message);
      return res.status(500).json({ 
        error: 'Database error retrieving functions' 
      });
    }
    
    res.json({ 
      functions: rows,
      count: rows.length,
      success: true 
    });
  });
});

// POST /api/functions - Save a new function
app.post('/api/functions', (req, res) => {
  try {
    const { functionName, functionString } = req.body;
    
    if (!functionName || !functionString) {
      return res.status(400).json({ 
        error: 'Function name and string are required' 
      });
    }
    
    const insertQuery = 'INSERT INTO saved_functions (function_name, function_string) VALUES (?, ?)';
    db.run(insertQuery, [functionName, functionString], function(err) {
      if (err) {
        console.error('Error saving function:', err.message);
        return res.status(500).json({ 
          error: 'Database error saving function' 
        });
      }
      
      res.json({ 
        id: this.lastID,
        functionName: functionName,
        functionString: functionString,
        success: true 
      });
    });
    
  } catch (error) {
    console.error('Function save error:', error.message);
    res.status(500).json({ 
      error: 'Error saving function',
      details: error.message 
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    database: 'Connected'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err.stack);
  res.status(500).json({ 
    error: 'Something went wrong on the server' 
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Endpoint not found' 
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Calculator server running on port ${PORT}`);
  console.log(`📊 API endpoints available at http://localhost:${PORT}/api`);
  console.log(`🏥 Health check: http://localhost:${PORT}/api/health`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down server...');
  db.close((err) => {
    if (err) {
      console.error('Error closing database:', err.message);
    } else {
      console.log('Database connection closed');
    }
    process.exit(0);
  });
});
