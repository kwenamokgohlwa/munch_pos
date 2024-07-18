declare module 'fastify-jwt' {
    import { FastifyRequest } from 'fastify';
  
    interface FastifyRequest {
      jwt: {
        sign(payload: any, options?: any): string;
        verify(token: string): Promise<any>;
        // Add other methods you might use from fastify-jwt
      };
    }
  }
  