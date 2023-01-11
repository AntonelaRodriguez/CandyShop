import {
  Box,
  Button,
  CloseButton,
  Container,
  Icon,
  Square,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react';
import * as React from 'react';
import { FiInfo } from 'react-icons/fi';

export const Banner = () => {
  const isMobile = useBreakpointValue({
    base: true,
    md: false,
  });
  return (
    <Box
      as='section'
      pb={{
        base: '12',
        md: '24',
      }}
    >
      <Box
        bg={'primary.200'}
        boxShadow={useColorModeValue('sm', 'sm-dark')}
        borderRadius='5'
        color={'white'}
      >
        <Container
          py={{
            base: '4',
            md: '2.5',
          }}
          position='relative'
        >
          <CloseButton
            display={{
              sm: 'none',
            }}
            position='absolute'
            right='2'
            top='2'
          />
          <Stack
            direction={{
              base: 'column',
              sm: 'row',
            }}
            justify='space-between'
            spacing={{
              base: '3',
              md: '2',
            }}
          >
            <Stack
              spacing='4'
              direction={{
                base: 'column',
                md: 'row',
              }}
              align={{
                base: 'start',
                md: 'center',
              }}
            >
              {!isMobile && (
                <Square size='12' bg='bg-subtle' borderRadius='md'>
                  <Icon as={FiInfo} boxSize='6' />
                </Square>
              )}
              <Stack
                direction={{
                  base: 'column',
                  md: 'row',
                }}
                spacing={{
                  base: '0.5',
                  md: '1.5',
                }}
                pe={{
                  base: '4',
                  sm: '0',
                }}
              >
                <Text fontWeight='medium' letterSpacing={1}>
                  Free shipping for orders above $5000
                </Text>
              </Stack>
            </Stack>
            <Stack
              direction={{
                base: 'column',
                sm: 'row',
              }}
              spacing={{
                base: '3',
                sm: '2',
              }}
              align={{
                base: 'stretch',
                sm: 'center',
              }}
            >
              {/* <CloseButton
                display={{
                  base: 'none',
                  sm: 'inline-flex',
                }}
              /> */}
            </Stack>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};
