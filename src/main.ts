import { NestFactory } from "@nestjs/core";
import session from "express-session";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(session());

  const passport = require("passport");
  // app.useGlobalPipes(new ClassValidationPipe({ whitelist: true }));
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(3000);
}
bootstrap();
