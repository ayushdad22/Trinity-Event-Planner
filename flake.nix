{
  description = "Flask backend + Next.js (Bun) frontend with all dependencies";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs { inherit system; };
        python = pkgs.python312;
      in {
        devShells.default = pkgs.mkShell {
          buildInputs = [
            python
            pkgs.python312Packages.pip
            pkgs.python312Packages.virtualenv
            pkgs.bun
            pkgs.nodejs
          ];

          shellHook = ''
            export PATH=${pkgs.bun}/bin:$PATH

            if [ ! -d .venv ]; then
              echo "Creating virtualenv..."
              virtualenv .venv
            fi

            source .venv/bin/activate

            if [ -f requirements.txt ]; then
              pip install -r requirements.txt --quiet
            fi

            echo "Dev shell ready."
            echo "  Frontend: bun install && bun dev"
            echo "  Backend:  python backend/app.py"
          '';
        };

        packages.backend = python.withPackages (ps: with ps; [
          flask
          flask-sqlalchemy
        ]);

        packages.frontend = pkgs.stdenv.mkDerivation {
          pname = "frontend";
          version = "0.1.0";
          src = ./frontend;
          nativeBuildInputs = [ pkgs.bun ];
          buildPhase = ''
            export PATH=${pkgs.bun}/bin:$PATH
            bun install
            bun run build
          '';
          installPhase = ''
            mkdir -p $out
            cp -r . $out/
          '';
        };
      });
}
