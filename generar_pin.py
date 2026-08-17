import sys

def calculate_valid_pin(handle):
    # Clean handle: lowercase, strip spaces, @, quotes
    clean = handle.strip().lower().replace('@', '').replace("'", "").replace('"', '')
    if not clean:
        return 'RIV000'
    
    hash_val = 0
    for char in clean:
        hash_val = ((hash_val << 5) - hash_val) + ord(char)
        hash_val &= 0xFFFFFFFF
    
    # 32-bit signed integer conversion
    if hash_val & 0x80000000:
        hash_val = -((~hash_val + 1) & 0xFFFFFFFF)
        
    abs_num = (abs(hash_val) % 900) + 100
    return f"RIV{abs_num}"

if __name__ == "__main__":
    user = sys.argv[1] if len(sys.argv) > 1 else input("Ingresa el usuario de YouTube (ej: @carloscelestino889): ")
    
    pin = calculate_valid_pin(user)
    
    print("\n==========================================================")
    print(f" 🔑 PIN PRIVADO MATEMATICO UNICO PARA {user.upper()}:  {pin}")
    print("==========================================================")
    print(f"Responde en YouTube: Tu PIN único de descarga es: {pin}\n")
