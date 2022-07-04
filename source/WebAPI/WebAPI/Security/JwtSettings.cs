namespace WebAPI.Security
{
    public class JwtSettings
    {
        public string Issuer { get; set; }
        public string ExpiryTime { get; set; }
        public bool UseRsa { get; set; }
        public string HmacSecretKey { get; set; }
        public string RsaPrivateKey { get; set; }
        public string RsaPublicKey { get; set; }
    }
}
