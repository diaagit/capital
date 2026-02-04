-- CreateIndex
CREATE INDEX "JwtToken_token_idx" ON "JwtToken"("token");

-- CreateIndex
CREATE INDEX "PasswordResetToken_token_idx" ON "PasswordResetToken"("token");
