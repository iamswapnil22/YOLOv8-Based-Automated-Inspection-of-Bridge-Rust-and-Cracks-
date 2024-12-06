import React from 'react';
import { Box, Container, Grid, Link, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      sx={{
        bgcolor: '#111', 
        color: 'white', 
        p: 6,
        mt: 'auto',
        boxShadow: '0 -2px 5px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        position: 'relative',
      }}
      component="footer"
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="center">
          {/* About Section */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" color="inherit" gutterBottom>
              About Bridge Inspection
            </Typography>
            <Typography variant="body1" color="inherit">
              Our app helps bridge inspectors detect cracks and rust on bridges using AI-powered image classification. Ensure the safety of bridges with advanced automated inspection.
            </Typography>
          </Grid>
          
          {/* Quick Links Section */}
          <Grid item xs={12} sm={3} md={2}>
            <Typography variant="h6" color="inherit" gutterBottom>
              Quick Links
            </Typography>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              <li>
                <Link href="#home" variant="body1" color="inherit" sx={{ '&:hover': { color: '#00b0ff' } }}>
                  Home
                </Link>
              </li>
              <li>
                <Link href="#upload" variant="body1" color="inherit" sx={{ '&:hover': { color: '#00b0ff' } }}>
                  Upload Files
                </Link>
              </li>
              <li>
                <Link href="#about" variant="body1" color="inherit" sx={{ '&:hover': { color: '#00b0ff' } }}>
                  About
                </Link>
              </li>
              <li>
                <Link href="#contact" variant="body1" color="inherit" sx={{ '&:hover': { color: '#00b0ff' } }}>
                  Contact Us
                </Link>
              </li>
            </ul>
          </Grid>

          {/* Social Media Links Section */}
          <Grid item xs={12} sm={3} md={2}>
            <Typography variant="h6" color="inherit" gutterBottom>
              Follow Us
            </Typography>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              <li>
                <Link href="https://github.com/iamswapnil22" variant="body1" color="inherit" sx={{ '&:hover': { color: '#00b0ff' } }}>
                  Github
                </Link>
              </li>
              <li>
                <Link href="https://www.linkedin.com/in/swapnil-shivpuje-182305246/" variant="body1" color="inherit" sx={{ '&:hover': { color: '#00b0ff' } }}>
                  LinkedIn
                </Link>
              </li>
              <li>
                <Link href="https://x.com/Shivpuje2204" variant="body1" color="inherit" sx={{ '&:hover': { color: '#00b0ff' } }}>
                  Twitter
                </Link>
              </li>
            </ul>
          </Grid>
        </Grid>

        {/* Copyright Section */}
        <Box mt={5}>
          <Typography variant="body2" color="inherit" align="center">
            {'© '}{new Date().getFullYear()}{' Group 17. All Rights Reserved.'}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
