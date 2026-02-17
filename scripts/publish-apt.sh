#!/bin/bash

# Configuration
REPO_NAME="themenal-apt"
DIST="stable"
COMPONENT="main"
ARCH="amd64"
REPO_DIR="repo"

echo "Generating APT repository structure..."

# 1. Create directory structure
mkdir -p ${REPO_DIR}/dists/${DIST}/${COMPONENT}/binary-${ARCH}
mkdir -p ${REPO_DIR}/pool/${COMPONENT}

# 2. Copy the .deb package to the pool
cp themenal_*.deb ${REPO_DIR}/pool/${COMPONENT}/

# 3. Generate Packages file
cd ${REPO_DIR}
dpkg-scanpackages pool/${COMPONENT} > dists/${DIST}/${COMPONENT}/binary-${ARCH}/Packages
cat dists/${DIST}/${COMPONENT}/binary-${ARCH}/Packages | gzip -9 > dists/${DIST}/${COMPONENT}/binary-${ARCH}/Packages.gz

# 4. Generate Release file
cd dists/${DIST}
cat <<EOF > Release
Origin: ${REPO_NAME}
Label: ${REPO_NAME}
Suite: ${DIST}
Codename: ${DIST}
Architectures: ${ARCH}
Components: ${COMPONENT}
Description: Themenal Terminal Theme Manager Repository
EOF

# Use apt-ftparchive for checksums if available
if command -v apt-ftparchive > /dev/null; then
    apt-ftparchive release . >> Release
else
    echo "Warning: apt-ftparchive not found. Checksums will be missing from Release file."
fi

echo ""
echo "Repository structure generated in '${REPO_DIR}/'."
echo ""
echo "NEXT STEPS (SIGNING):"
echo "1. Sign the Release file:"
echo "   gpg --armor --detach-sign -o Release.gpg Release"
echo "   gpg --armor --clearsign -o InRelease Release"
echo ""
echo "2. Push the '${REPO_DIR}/' folder to GitHub Pages."
echo ""
echo "3. Users can then add the repository with:"
echo "   echo \"deb [url_to_gh_pages] stable main\" | sudo tee /etc/apt/sources.list.d/themenal.list"
echo "   wget -qO - [url_to_gpg_public_key] | sudo apt-key add -"
