import sys

def calculate_valid_pin(handle, attempt=1):
    clean = handle.strip().lower().replace('@', '').replace("'", "").replace('"', '')
    if not clean:
        return 'RIV000'
    
    salt = f"{clean}_attempt_{attempt}"
    hash_val = 0
    for char in salt:
        hash_val = ((hash_val << 5) - hash_val) + ord(char)
        hash_val &= 0xFFFFFFFF
    
    # Unsigned 32-bit int conversion
    if hash_val & 0x80000000:
        hash_val = -((~hash_val + 1) & 0xFFFFFFFF)
        
    abs_num = (abs(hash_val) % 900) + 100
    return f"RIV{abs_num}"

if __name__ == "__main__":
    user = sys.argv[1] if len(sys.argv) > 1 else input("Ingresa el usuario de YouTube (ej: @carloscelestino889): ")
    attempt = int(sys.argv[2]) if len(sys.argv) > 2 else 1
    
    pin = calculate_valid_pin(user, attempt)
    print("\n==========================================================")
    print(f" 🔑 PIN PRIVADO PARA {user.upper()} (Intento #{attempt}):  {pin}")
    print("==========================================================")
    print(f"Responde en YouTube: Tu PIN único de descarga es: {pin}")
    print("Nota: Si necesitas un 2do PIN para el mismo usuario, ejecuta:")
    print(f"      python generar_pin.py {user} 2\n")
