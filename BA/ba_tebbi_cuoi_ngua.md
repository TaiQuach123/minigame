# TÀI LIỆU BA TRIỂN KHAI - MINIGAME CƯỠI NGỰA VÀNG - SĂN NGÀN LỘC


---

## **1. BUSINESS OVERVIEW**

### **1.1 Background (Giới thiệu)**

Minigame "Cưỡi ngựa vàng - Săn ngàn lộc" được phát triển nhằm tăng engagement và tạo trải nghiệm vui vẻ cho người dùng Rovi Travel trong dịp Tết Nguyên Đán. Người chơi hoá thân thành Tebbi cưỡi ngựa vàng, gieo xúc xắc để du xuân qua 34 tỉnh thành Việt Nam trên bản đồ hình chữ S, nhận lộc xuân tại mỗi điểm dừng. Dự án tận dụng không khí Tết với các yếu tố văn hoá truyền thống (lì xì, câu chúc Tết) kết hợp với gamification để tăng thời gian sử dụng app và tạo cảm giác tích cực về thương hiệu.

---

### **1.2 Objectives (Mục Tiêu thành công của dự án)**

* **Đạt ít nhất 50-100 Daily Active Users (DAU) trong tuần đầu tiên** (phù hợp với timeline ngắn và nguồn lực hạn chế)
* **Tỷ lệ hoàn thành 1 vòng (34 tỉnh) đạt ≥ 20%** trong số người chơi đã bắt đầu chơi
* **Tỷ lệ hoàn thành bộ 4 mảnh ghép đạt ≥ 10%** trong số người chơi đã hoàn thành ít nhất 1 vòng
* **Tỷ lệ điểm danh hàng ngày đạt ≥ 30%** trong số người chơi active
* **Tăng thời gian sử dụng app trung bình lên ít nhất 15%** so với baseline trước khi có minigame

---

### **1.3 Target Users (Đối tượng người dùng)**

* **Người dùng chính**: Người dùng đã truy cập và sử dụng app Rovi Travel, độ tuổi từ 18-45 tuổi, quan tâm đến du lịch và các hoạt động giải trí
* **Đặc điểm**: 
  * Không yêu cầu kỹ năng đặc biệt, không cần hướng dẫn dài
  * Quen thuộc với các minigame đơn giản trên mobile
  * Có hứng thú với các hoạt động Tết và phần thưởng
  * Sẵn sàng dành 2-5 phút mỗi ngày để chơi
* **Phân khúc**:
  * Người dùng casual: Chơi giải trí, nhận thưởng nhỏ
  * Người dùng engaged: Muốn hoàn thành đủ 4 mảnh ghép để nhận thưởng lớn

---

### **1.4 Scope (Phạm vi)**

#### **In scope (Trong phạm vi) - PHASE 1 (1 tuần)**

**Tính năng core (Must-have)**:
* Chơi minigame trong app Rovi Travel (không phải mini app)
* Hệ thống gieo xúc xắc và di chuyển Tebbi trên bản đồ 34 tỉnh thành (bản đồ đơn giản, không cần animation phức tạp)
* Hệ thống thưởng: hoàn tiền vào ví thưởng, câu chúc Tết, thêm lượt chơi
* Hệ thống mảnh ghép: 4 mảnh ghép hành trình (Xuân Bắc, Xuân Trung, Xuân Nam, Xuân Biển đảo)
* Điểm danh đơn giản: Mỗi ngày điểm danh nhận +1 lượt (không cần chu kỳ phức tạp)
* Tích hợp với hệ thống ví thưởng để hoàn tiền (nếu API sẵn có)
* Tracking cơ bản: Chỉ track các events quan trọng (game_started, dice_rolled, reward_received, puzzle_completed)
* Responsive design cho mobile-first experience (tối ưu cho 1 platform chính)

**Tính năng đơn giản hóa**:
* Bản đồ: Sử dụng hình ảnh tĩnh hoặc SVG đơn giản, không cần interactive map phức tạp
* Animation: Chỉ animation cơ bản (xúc xắc quay, popup thưởng), không cần hiệu ứng phức tạp
* UI: Tối thiểu số màn hình (4-5 màn hình core)

#### **Out of scope (Ngoài phạm vi) - PHASE 1**

* Thanh toán hoặc trả phí để mua lượt chơi
* Tích hợp với các hệ thống ngoài mini app (web app độc lập)
* Multiplayer hoặc tính năng cạnh tranh trực tiếp giữa người dùng
* Leaderboard hoặc ranking system
* Tính năng chat hoặc tương tác xã hội trong game
* Tích hợp với hệ thống đặt tour/booking
* Push notification ngoài mini app
* **Hệ thống nhiệm vụ phức tạp** (chỉ giữ nhiệm vụ đơn giản nhất nếu có thời gian)
* **Chu kỳ điểm danh phức tạp** (ngày 1, 3, 7) - chỉ làm điểm danh đơn giản mỗi ngày +1 lượt
* **Chia sẻ và mời bạn** - tính năng này có thể làm sau
* **Analytics dashboard phức tạp** - chỉ track events cơ bản

---

## **2. PROJECT CONCEPT**

### **2.1 Project Name (Tên Dự án)**

**Cưỡi ngựa vàng - Săn ngàn lộc**


---

### **2.2 Project Description (Mô tả dự án)**

Minigame du xuân nơi người chơi gieo xúc xắc để đưa Tebbi cưỡi ngựa vàng đi qua 34 tỉnh thành Việt Nam trên bản đồ hình chữ S. Mỗi điểm dừng tại một tỉnh thành, người chơi nhận một phần lộc xuân ngẫu nhiên: hoàn tiền vào ví thưởng, câu chúc Tết kèm hiệu ứng, hoặc thêm lượt chơi. Khi hoàn thành một vòng (đi hết 34 tỉnh), người chơi nhận một mảnh ghép hành trình. Hoàn thành đủ 4 mảnh ghép sẽ nhận thưởng lớn và có thể tiếp tục chơi để thu thập thêm mảnh ghép. Minigame kết hợp điểm danh theo mốc thời gian để tăng engagement và thời gian sử dụng app.

---

### **2.3 Why this Project? (Tại sao làm dự án này?)**

* **Luật chơi cực đơn giản**: Người chơi chỉ cần gieo xúc xắc và nhận thưởng, không cần học luật phức tạp (<10 giây để hiểu)
* **Phù hợp với mùa Tết**: Tận dụng không khí Tết với các yếu tố văn hoá (lì xì, câu chúc, du xuân) để tạo cảm xúc tích cực
* **Tăng engagement**: Tạo lý do để người dùng quay lại app hàng ngày thông qua điểm danh và nhiệm vụ
* **Tạo cảm giác "trúng thưởng"**: Hệ thống thưởng ngẫu nhiên và mảnh ghép tạo cảm giác may mắn và mong đợi
* **Gắn kết với thương hiệu**: Tebbi và bản đồ Việt Nam gắn liền với thương hiệu du lịch Rovi Travel
* **Khả thi về kỹ thuật**: Chỉ cần các component cơ bản (xúc xắc, map đơn giản, reward random, counter) nên có thể triển khai nhanh trong 1 tuần với scope đã được tinh chỉnh
* **Tăng retention**: Cơ chế vòng lặp và mảnh ghép khuyến khích người chơi quay lại để hoàn thành bộ sưu tập

---

## **I. TỔNG QUAN TRÒ CHƠI**

Minigame khám phá bản đồ Việt Nam mới với **34 tỉnh thành**. Người chơi gieo xúc xắc để thu thập bộ **4 mảnh ghép duy nhất** (Bắc, Trung, Nam và 1 Mảnh Hiếm) để đổi giải thưởng lớn.

---

## **II. QUY TRÌNH CHƠI (GAME FLOW)**

1. **Chọn Tỉnh:** Click vào 1 trong 34 tỉnh trên bản đồ Việt Nam.
2. **Gieo Xúc Xắc:** Di chuyển trên bàn cờ hình vuông 20 ô của tỉnh đó.
3. **Hoàn Thành:** Chạm hoặc vượt qua **ô số 20 (Finish)** để kết thúc tỉnh và nhận thưởng lượt chơi.

---

## **III. CHI TIẾT BÀN CỜ 20 Ô (SQUARE BOARD)**

Bố trí các ô dựa trên tỷ lệ cố định để đảm bảo cân bằng giữa thử thách và phần thưởng:

| STT | Loại ô | Số lượng | Tỷ lệ % | Chức năng chi tiết |
| :--- | :--- | :---: | :---: | :--- |
| **1** | **START** | 1 | 5% | Vị trí xuất phát. |
| **20** | **FINISH** | 1 | 5% | **Ô Cuối:** Hoàn thành tỉnh, nhận thưởng +1 lượt và quay lại bản đồ. |
| **6, 16** | **SỰ KIỆN** | 2 | 10% | **Săn Mảnh Ghép:** Tỉ lệ rơi mảnh vùng miền hoặc mảnh Hiếm. |
| 3, 8, 13, 18 | **TIỀN THƯỞNG** | 4 | 20% | Hoàn tiền trực tiếp vào ví thưởng. |
| 7, 14, 19 | **THÊM LƯỢT** | 3 | 15% | Nhận ngay +1 hoặc +2 lượt gieo xúc xắc. |
| 4, 10, 17 | **THỬ THÁCH** | 3 | 15% | Lùi bước, đứng im hoặc bị trừ xu. |
| Còn lại | **LỜI CHÚC** | 6 | 30% | Hiện pop-up câu chúc + thưởng xu nhỏ. |

---

## **IV. CƠ CHẾ KIẾM LƯỢT CHƠI (HỆ THỐNG VẬN HÀNH)**

Game không quảng cáo, lượt chơi được cấp theo các mốc sau:

* **Tặng khởi tạo:** **10 lượt** khi chơi lần đầu.
* **Điểm danh:** **+3 lượt** mỗi ngày khi đăng nhập.
* **Hồi lượt tự động:** **+1 lượt** sau mỗi **2 tiếng** đồng hồ.
* **Thưởng thành tích:**
    * Hoàn thành 1 tỉnh: **+1 lượt**.
    * Hoàn thành tất cả các tỉnh trong 1 miền: **+10 lượt**.
* **May mắn:** Nhận thêm lượt tại các ô **Thêm Lượt** trên bàn cờ.

---

## **V. CƠ CHẾ MẢNH GHÉP & BẢO HIỂM (QUAN TRỌNG)**

Hệ thống đảm bảo người chơi sẽ sở hữu đủ bộ mảnh ghép nếu hoàn thành bản đồ:

### 1. Mảnh Ghép Vùng Miền (3 Mảnh)
- **Cơ chế rơi:** Xuất hiện ngẫu nhiên tại ô **Sự kiện (6, 16)**.
- **Giới hạn rơi (Daily Limit):** Trong một ngày, người chơi chỉ có thể nhận **tối đa 1 mảnh ghép vùng miền**. 
    * *Mục đích:* Kéo dài thời gian trải nghiệm, tránh việc người chơi lấy hết mảnh vùng trong 1 ngày.


- **Bảo hiểm:** Nếu đã chơi hết toàn bộ tỉnh của một miền mà vẫn chưa có mảnh, hệ thống tự động tặng mảnh đó ở tỉnh cuối cùng.

### 2. Mảnh Ghép Hiếm (Mảnh thứ 4)
Để tăng giá trị cho giải thưởng lớn, mảnh Hiếm chỉ xuất hiện khi đạt đủ 2 điều kiện:
- **Điều kiện 1:** Người chơi phải sở hữu đủ **3 mảnh vùng miền** (Bắc, Trung, Nam).
- **Điều kiện 2:** Người chơi đã hoàn thành ít nhất **50% bản đồ (17/34 tỉnh thành)**.
- **Cơ chế rơi:** Khi thỏa mãn 2 điều kiện trên, mảnh Hiếm sẽ bắt đầu xuất hiện ngẫu nhiên tại các ô Sự kiện.
- **Bảo hiểm tối thượng:** Nếu hoàn thành toàn bộ **34 tỉnh** mà vẫn chưa có mảnh Hiếm, hệ thống sẽ chắc chắn tặng tại ô Finish tỉnh thứ 34.

---

## **3. USER FLOW**

### **3.1 High-level Flow (Luồng người dùng tổng quan)**

**Luồng chính (Cập nhật theo game flow mới)**: Entry → Xem luật chơi (lần đầu, đơn giản) → Bản đồ Việt Nam tổng quát → Chọn tỉnh → Màn hình bàn cờ tỉnh → Gieo xúc xắc → Di chuyển trên bàn cờ 20 ô → Dừng tại ô → Nhận thưởng → Chơi tiếp → Hoàn thành tỉnh (ô 20) → Quay về bản đồ → Chọn tỉnh tiếp theo → Thu thập đủ 4 mảnh ghép → Nhận thưởng lớn

**Luồng chi tiết (Tối giản)**:
1. **Entry**: Người dùng thấy banner/popup minigame trên app Rovi Travel → Click vào
2. **Onboarding** (lần đầu, đơn giản): Xem popup hướng dẫn ngắn gọn luật chơi → Click "Bắt đầu" (có thể skip)
3. **Bản đồ tổng quát**: Xem bản đồ Việt Nam với 34 tỉnh thành → Xem số lượt còn lại → Xem tiến độ hoàn thành → Click vào một tỉnh để chơi
4. **Màn hình bàn cờ tỉnh**: Xem bàn cờ hình vuông 20 ô của tỉnh đã chọn → Xem vị trí hiện tại trên bàn cờ → Click nút "Gieo xúc xắc"
5. **Roll Dice**: Xúc xắc quay (animation đơn giản) → Hiển thị số (1-6) → Marker di chuyển trên bàn cờ (animation cơ bản)
6. **Land on Square**: Marker dừng tại một ô → Kích hoạt chức năng ô (Sự kiện/Tiền thưởng/Thêm lượt/Thử thách/Lời chúc) → Popup thưởng hiển thị
7. **Reward Popup**: Hiển thị loại thưởng nhận được (tiền/câu chúc/lượt/mảnh ghép) → Click "Tiếp tục" → Quay về màn hình bàn cờ tỉnh
8. **Hoàn thành tỉnh**: Khi đến ô FINISH (20) → Popup hoàn thành tỉnh → Nhận thưởng +1 lượt → Quay về bản đồ tổng quát
9. **Puzzle Check** (nếu nhận mảnh ghép tại ô Sự kiện): Tự động hiển thị popup mảnh ghép nhận được → Click "Tiếp tục"
10. **Puzzle Complete** (nếu đủ 4 mảnh): Popup thông báo hoàn thành → Nhận thưởng lớn → Tiếp tục chơi
11. **CTA đơn giản**: Chơi tiếp / Điểm danh (nếu có thời gian) / Quay lại bản đồ / Đóng

---

### **3.2 Entry Points (Điểm truy cập) - Đơn giản hóa**

* **Banner trên homepage**: Banner nổi bật với hình ảnh Tebbi và text "Cưỡi ngựa vàng - Săn ngàn lộc" (ưu tiên)
* **Popup modal**: Popup tự động hiển thị khi người dùng vào app lần đầu (có thể tắt, không hiện lại)

**Loại bỏ trong Phase 1**:
* Menu item trong menu chính của app
* Notification trong app (phức tạp, cần setup)
* Deep link từ email/SMS (không cần thiết cho MVP)

---

### **3.3 Exit / CTA (Điểm thoát / Call-to-Action) - Đơn giản hóa**

**Các CTA chính sau mỗi lượt chơi (Tối giản)**:
* **"Chơi tiếp"**: Nếu còn lượt → Quay lại màn hình game để gieo tiếp (CTA chính)
* **"Điểm danh"**: Nếu chưa điểm danh hôm nay → Popup điểm danh đơn giản (nếu có thời gian)
* **"Xem mảnh ghép"**: Popup hiển thị tiến độ thu thập 4 mảnh ghép (có thể tích hợp vào Screen 2 - Bản đồ tổng quát)
* **"Đóng"**: Thoát về trang chủ hoặc màn hình trước đó

**Loại bỏ trong Phase 1**:
* "Xem nhiệm vụ" (không có nhiệm vụ phức tạp)
* "Chia sẻ với bạn bè" (tính năng này làm sau)
* "Khám phá điểm du lịch" (cross-sell làm sau)

**Điểm thoát hợp lý**:
* Sau khi nhận thưởng và không còn lượt → Hiển thị CTA "Điểm danh" (nếu có) hoặc "Quay lại bản đồ" hoặc "Đóng"
* Sau khi hoàn thành tỉnh → Quay về bản đồ tổng quát với CTA "Chọn tỉnh tiếp theo"
* Sau khi hoàn thành 4 mảnh ghép → Nhận thưởng lớn và CTA "Tiếp tục chơi"
* Người dùng có thể đóng minigame bất cứ lúc nào và quay lại tiếp tục sau

---

## **4. BUSINESS RULES**

### **4.1 Business Rules Table**

| ID | Rule Description | Priority | Notes |
| ----- | ----- | ----- | ----- |
| BR01 | **Luật gieo xúc xắc**: Mỗi lượt chơi, người chơi gieo xúc xắc một lần và nhận số ngẫu nhiên từ 1-6. Tebbi di chuyển đúng số bước tương ứng trên bản đồ theo tuyến cố định Bắc → Trung → Nam. | High | Xúc xắc phải random thực sự, không được predict được |
| BR02 | **Luật nhận thưởng tại tỉnh**: Khi Tebbi dừng tại một tỉnh, hệ thống random ngẫu nhiên 1 trong 3 loại thưởng: (1) Hoàn tiền vào ví thưởng (2k/5k/10k VNĐ), (2) Câu chúc Tết kèm hiệu ứng, (3) Thêm lượt chơi (+1 hoặc +2 lượt). Tỷ lệ: 40% tiền, 40% câu chúc, 20% lượt. | High | Tỷ lệ đã được điều chỉnh |
| BR03 | **Luật về đích và mảnh ghép**: Khi Tebbi đi hết 34 tỉnh thành (hoàn thành 1 vòng), người chơi tự động nhận 1 mảnh ghép hành trình ngẫu nhiên trong 4 loại: Xuân Bắc (30%), Xuân Trung (30%), Xuân Nam (30%), Xuân Biển đảo (10%). | High | Mỗi vòng chỉ nhận 1 mảnh, không nhận nhiều mảnh cùng lúc |
| BR04 | **Luật hoàn thành 4 mảnh ghép**: Khi người chơi thu thập đủ 4 mảnh ghép khác nhau, hệ thống tự động trao thưởng lớn: hoàn tiền 50k-100k VNĐ vào ví thưởng + thông báo "Tebbi đã hoàn thành Hành Trình Du Xuân Việt Nam!" + người chơi có thể tiếp tục chơi để thu thập thêm mảnh ghép (có thể nhận mảnh trùng). Không reset bản đồ, giữ nguyên vị trí hiện tại. | High | Đây là milestone quan trọng nhất, cần có hiệu ứng đặc biệt |
| BR05 | **Luật điểm danh**: Người chơi có thể điểm danh nhiều lần trong ngày theo các mốc thời gian quy định (ví dụ: 8h, 12h, 18h, 22h). Mỗi lần điểm danh nhận +1 lượt chơi. Hệ thống kiểm tra mốc thời gian để cho phép điểm danh. | Medium | Cho phép điểm danh nhiều lần trong ngày |
| BR06 | **Luật nhiệm vụ (Tùy chọn)**: Nếu có thời gian, có thể thêm 1-2 nhiệm vụ đơn giản: (1) Đăng nhập app → +1 lượt (tự động), (2) Hoàn thành 1 vòng → +1 mảnh ghép (tự động). Các nhiệm vụ phức tạp khác làm sau. | Low | Chỉ làm nếu có thời gian dư |
| BR07 | **Luật giới hạn lượt chơi**: Người chơi bắt đầu với 3 lượt miễn phí. Lượt được cộng thêm qua: điểm danh, nhiệm vụ, thưởng trong game. Không có giới hạn tối đa số lượt tích lũy. Lượt không hết hạn trong thời gian diễn ra minigame. | High | Tránh cảm giác bị giới hạn quá nhiều |
| BR08 | **Luật validation lượt chơi**: Trước mỗi lượt gieo xúc xắc, hệ thống phải kiểm tra số lượt còn lại. Nếu = 0, hiển thị thông báo "Bạn đã hết lượt" và CTA "Điểm danh" hoặc "Xem nhiệm vụ". | High | Tránh lỗi khi người dùng cố gắng chơi khi hết lượt |
| BR09 | **Luật lưu tiến độ**: Hệ thống phải lưu vị trí hiện tại của Tebbi, số lượt còn lại, số mảnh ghép đã có, và tiến độ điểm danh/nhiệm vụ. Người chơi có thể thoát và quay lại tiếp tục bất cứ lúc nào. | High | Critical cho user experience |
| BR10 | **Luật sau khi hoàn thành 4 mảnh ghép**: Sau khi hoàn thành 4 mảnh ghép và nhận thưởng lớn, hệ thống giữ nguyên tất cả: vị trí Tebbi hiện tại, số lượt còn lại, mảnh ghép đã có, và tiến độ điểm danh. Người chơi tiếp tục chơi từ vị trí hiện tại và có thể thu thập thêm mảnh ghép (kể cả mảnh trùng). | Medium | Cho phép người chơi tiếp tục chơi và thu thập thêm mảnh ghép |
| BR11 | **Luật tích hợp ví thưởng**: Khi người chơi nhận hoàn tiền (từ thưởng tỉnh hoặc hoàn thành 4 mảnh), số tiền phải được cộng vào ví thưởng ngay lập tức và hiển thị thông báo xác nhận. Nếu tích hợp lỗi, phải có cơ chế retry và log lỗi. | High | Critical cho trust và user satisfaction |

---

### **4.2 Edge Cases (Trường hợp biên)**

* **Hết lượt giữa chừng**: Nếu người chơi hết lượt khi đang ở giữa vòng (chưa về đích), tiến độ vẫn được lưu. Khi có lượt mới, có thể tiếp tục từ vị trí hiện tại.
* **Lỗi mạng khi gieo xúc xắc**: Nếu mạng lỗi sau khi gieo xúc xắc nhưng trước khi nhận thưởng, hệ thống phải rollback: không trừ lượt, Tebbi không di chuyển, cho phép gieo lại.
* **Lỗi tích hợp ví thưởng**: Nếu API ví thưởng không phản hồi hoặc lỗi khi cộng tiền, hệ thống phải lưu vào queue và retry sau. Hiển thị thông báo "Đang xử lý thưởng, vui lòng đợi" và cập nhật sau khi thành công.
* **Người chơi đã hoàn thành 4 mảnh nhưng chưa nhận thưởng**: Nếu người chơi đóng app trước khi nhận thưởng lớn, khi mở lại phải tự động hiển thị popup thưởng và reset vòng.
* **Người chơi điểm danh nhiều lần trong ngày**: Hệ thống cho phép điểm danh nhiều lần trong ngày theo các mốc thời gian quy định (ví dụ: 8h, 12h, 18h, 22h). Mỗi mốc thời gian chỉ được điểm danh 1 lần. Nếu người chơi cố gắng điểm danh tại mốc thời gian đã điểm danh rồi, hiển thị "Bạn đã điểm danh mốc này rồi" và hiển thị mốc thời gian tiếp theo có thể điểm danh. Nếu điểm danh trước khi đến mốc thời gian, hiển thị "Vui lòng đợi đến [mốc thời gian tiếp theo] để điểm danh".
* **Lỗi khi reset vòng mới**: Nếu lỗi xảy ra khi reset vòng sau khi hoàn thành 4 mảnh, hệ thống phải đảm bảo: (1) Thưởng lớn đã được trao, (2) Mảnh ghép đã sử dụng bị xoá, (3) Vị trí Tebbi giữ nguyên. Nếu thiếu bất kỳ bước nào, phải có cơ chế recovery.
* **Người chơi đạt giới hạn API rate limit**: Nếu hệ thống đạt rate limit khi gọi API ví thưởng hoặc tracking, phải có cơ chế queue và retry với exponential backoff.
* **Dữ liệu không đồng bộ giữa client và server**: Hệ thống phải có cơ chế sync: khi mở app, client phải fetch latest state từ server và cập nhật UI. Nếu có conflict, ưu tiên server state.
* **Người chơi chơi trên nhiều thiết bị**: Tiến độ phải được lưu trên server và sync giữa các thiết bị. Nếu người chơi chơi trên 2 thiết bị cùng lúc, thiết bị nào cập nhật sau sẽ overwrite thiết bị trước (last write wins).

---

## **5. UI / UX SPEC**

### **5.1 Screen List (Danh sách màn hình)**

#### **Screen 1 – Entry/Landing Screen (Đơn giản hóa)**

* **Purpose**: Màn hình đầu tiên khi người dùng click vào minigame từ banner/popup. Giới thiệu minigame và khuyến khích bắt đầu chơi.
* **Components**: 
  * Header: Logo/Tên "Cưỡi ngựa vàng - Săn ngàn lộc"
  * Hero image: Hình ảnh Tebbi cưỡi ngựa trên bản đồ Việt Nam (có thể dùng ảnh tĩnh)
  * Text ngắn gọn: "Gieo xúc xắc, du xuân 34 tỉnh thành, nhận lộc Tết!"
  * Button chính: "Bắt đầu ngay" (CTA nổi bật)
  * Close button (X) ở góc trên phải
* **User Actions**:
  * Click "Bắt đầu ngay" → Hiển thị popup luật chơi ngắn gọn (nếu lần đầu) → Chuyển đến Screen 2 (Bản đồ tổng quát)
  * Click "X" → Đóng và quay về trang trước
* **Lưu ý**: Có thể gộp với popup luật chơi thành 1 màn hình đơn giản

---

#### **Screen 2 – Rule Screen (Popup đơn giản)**

* **Purpose**: Giải thích luật chơi ngắn gọn cho người chơi lần đầu (có thể skip).
* **Components**: 
  * **Popup overlay** (chiếm 80% màn hình, center):
    * Header: "Luật chơi - Cưỡi ngựa vàng - Săn ngàn lộc" + Close button (X)
    * Content ngắn gọn (3-4 dòng):
      * "Gieo xúc xắc để di chuyển Tebbi qua 34 tỉnh thành"
      * "Mỗi tỉnh nhận thưởng: tiền, câu chúc, hoặc lượt chơi"
      * "Hoàn thành vòng nhận mảnh ghép, đủ 4 mảnh nhận thưởng lớn"
    * Icons minh họa đơn giản (3 icons: xúc xắc, thưởng, mảnh ghép)
    * Button: "Bắt đầu chơi" (CTA chính)
  * Background dimmed
* **User Actions**:
  * Click "Bắt đầu chơi" → Đóng popup và chuyển đến Screen 2 (Bản đồ tổng quát)
  * Click "X" hoặc click outside → Đóng popup và chuyển đến Screen 2 (Bản đồ tổng quát)
* **Lưu ý**: Popup này chỉ hiển thị lần đầu, có thể skip dễ dàng

---

#### **Screen 2 – Bản Đồ Việt Nam Tổng Quát (Map Overview Screen)**

* **Purpose**: Màn hình chính hiển thị bản đồ Việt Nam với 34 tỉnh thành, nơi người chơi chọn tỉnh để bắt đầu chơi bàn cờ 20 ô.
* **Components**: 
  * **Top bar** (đơn giản):
    * Số lượt còn lại: "Lượt: X" (hiển thị nổi bật)
    * Icon điểm danh nhỏ: Badge hiển thị nếu chưa điểm danh hôm nay
    * Icon mảnh ghép nhỏ: Hiển thị "X/4" mảnh ghép đã có
    * Button "Xem mảnh ghép" (optional)
  * **Map area** (chiếm 80-85% màn hình):
    * Bản đồ Việt Nam hình chữ S (SVG interactive hoặc hình ảnh với clickable areas)
    * **34 tỉnh thành** được hiển thị rõ ràng với:
      * Tên tỉnh hiển thị trên mỗi tỉnh (hoặc hiển thị khi hover/click)
      * **Trạng thái tỉnh:**
        * Tỉnh chưa chơi: Màu xám nhạt hoặc màu mặc định
        * Tỉnh đã hoàn thành: Màu xanh lá với icon checkmark hoặc badge "Hoàn thành"
        * Tỉnh đang chơi dở: Màu vàng/cam với badge "Đang chơi"
        * Tỉnh có thể chơi: Highlight nhẹ, có thể click
    * **Phân vùng miền:** Màu sắc nhẹ để phân biệt 3 miền (Bắc, Trung, Nam)
    * **Progress indicators:**
      * Số tỉnh đã hoàn thành: "Đã hoàn thành: X/34 tỉnh"
      * Tiến độ theo miền: "Bắc: X/Y tỉnh", "Trung: X/Y tỉnh", "Nam: X/Y tỉnh"
  * **Bottom info bar** (optional):
    * Thông tin tổng quan: Tổng số lượt đã chơi, số mảnh ghép đã có
    * Button "Điểm danh" (nếu chưa điểm danh)
* **User Actions**:
  * Click vào một tỉnh thành → Kiểm tra lượt còn lại:
    * Nếu có lượt → Chuyển đến Screen 3 (Màn hình bàn cờ tỉnh)
    * Nếu hết lượt → Hiển thị popup "Bạn đã hết lượt" với CTA "Điểm danh" hoặc "Đóng"
  * Click icon điểm danh → Popup điểm danh
  * Click icon mảnh ghép → Popup hiển thị mảnh ghép
  * Click vào tỉnh đã hoàn thành → Hiển thị popup thông tin tỉnh (tùy chọn) hoặc cho phép chơi lại
* **Visual States**:
  * Tỉnh có thể chơi: Cursor pointer, có hiệu ứng hover (scale nhẹ hoặc glow)
  * Tỉnh đã hoàn thành: Hiển thị icon checkmark hoặc badge
  * Tỉnh đang chơi dở: Hiển thị badge "Tiếp tục" hoặc icon đặc biệt
* **Animation**:
  * Fade in khi load màn hình
  * Hover effect khi di chuột qua tỉnh (scale hoặc glow)
  * Transition mượt khi chuyển sang màn hình bàn cờ tỉnh

---

#### **Screen 3 – Màn Hình Bàn Cờ Tỉnh (Province Board Screen)**

* **Purpose**: Màn hình hiển thị bàn cờ hình vuông 20 ô của tỉnh đã chọn, nơi người chơi gieo xúc xắc và di chuyển trên bàn cờ.
* **Components**: 
  * **Header bar**:
    * Tên tỉnh đang chơi: "Tỉnh [Tên]" (hiển thị nổi bật)
    * Button "Quay lại bản đồ" (icon mũi tên trái hoặc icon bản đồ)
    * Số lượt còn lại: "Lượt: X" (hiển thị nhỏ)
  * **Board area** (chiếm 60-70% màn hình, center):
    * **Bàn cờ hình vuông** với 20 ô được sắp xếp theo layout:
      * Ô số 1 (START) ở góc trên trái hoặc vị trí xuất phát
      * Các ô được sắp xếp theo đường zigzag hoặc hình vuông 4x5 hoặc 5x4
      * Ô số 20 (FINISH) ở vị trí cuối cùng
    * **Mỗi ô hiển thị:**
      * Số thứ tự ô (1-20)
      * Icon/biểu tượng loại ô:
        * START: Icon cờ xuất phát
        * FINISH: Icon cờ đích
        * SỰ KIỆN (6, 16): Icon ngôi sao hoặc gift box
        * TIỀN THƯỞNG (3, 8, 13, 18): Icon VNĐ hoặc tiền vàng
        * THÊM LƯỢT (7, 14, 19): Icon bao lì xì hoặc lượt
        * THỬ THÁCH (4, 10, 17): Icon cảnh báo hoặc thử thách
        * LỜI CHÚC (còn lại): Icon câu chúc hoặc pháo hoa
      * Màu sắc phân biệt theo loại ô
    * **Vị trí người chơi:**
      * Icon Tebbi hoặc marker hiển thị tại ô hiện tại
      * Animation khi di chuyển từ ô này sang ô khác
    * **Trạng thái ô:**
      * Ô đã đi qua: Màu xám nhạt hoặc có dấu checkmark
      * Ô hiện tại: Highlight màu đỏ/vàng, có animation nhấp nháy nhẹ
      * Ô chưa đến: Màu mặc định
  * **Dice area** (phía dưới board):
    * Xúc xắc lớn (có thể click để gieo)
    * Button "Gieo xúc xắc" (nếu còn lượt) hoặc "Hết lượt" (disabled nếu = 0)
    * Hiển thị số xúc xắc vừa gieo (nếu có)
  * **Progress indicator**:
    * Text: "Ô hiện tại: X/20" hoặc progress bar
    * Thông tin: "Còn X ô nữa để hoàn thành"
* **User Actions**:
  * Click "Gieo xúc xắc" hoặc click vào xúc xắc → 
    * Kiểm tra lượt còn lại:
      * Nếu có lượt → Xúc xắc quay animation (1-2 giây) → Hiển thị số (1-6) → Di chuyển marker trên bàn cờ → Dừng tại ô mới → Kích hoạt chức năng ô
      * Nếu hết lượt → Hiển thị popup "Bạn đã hết lượt" với CTA "Điểm danh" hoặc "Quay lại bản đồ"
  * Click vào ô đã đi qua → Hiển thị popup thông tin ô (tùy chọn)
  * Click "Quay lại bản đồ" → Quay về Screen 2 (Bản đồ tổng quát)
  * Khi đến ô FINISH (20) → 
    * Hiển thị popup hoàn thành tỉnh → Nhận thưởng +1 lượt → Quay về Screen 2 (Bản đồ tổng quát)
* **Chức năng các loại ô**:
  * **START (1)**: Không có tác dụng, chỉ là điểm xuất phát
  * **FINISH (20)**: Hoàn thành tỉnh, nhận +1 lượt, quay về bản đồ
  * **SỰ KIỆN (6, 16)**: Popup săn mảnh ghép (có thể nhận mảnh vùng miền hoặc mảnh Hiếm)
  * **TIỀN THƯỞNG (3, 8, 13, 18)**: Popup nhận tiền vào ví thưởng
  * **THÊM LƯỢT (7, 14, 19)**: Popup nhận +1 hoặc +2 lượt
  * **THỬ THÁCH (4, 10, 17)**: Popup thử thách (lùi bước, đứng im, trừ xu)
  * **LỜI CHÚC (còn lại)**: Popup câu chúc + thưởng xu nhỏ
* **Animation**:
  * Xúc xắc quay 1-2 giây với CSS animation + sound effect
  * Marker di chuyển từ ô này sang ô khác (slide hoặc path animation, 0.5-1 giây)
  * Hiệu ứng pháo hoa khi dừng tại ô mới
  * Highlight animation cho ô hiện tại (pulse hoặc glow)
  * Confetti khi hoàn thành tỉnh (đến ô FINISH)
* **Lưu ý**: 
  * Tiến độ trên bàn cờ được lưu lại, người chơi có thể quay lại tiếp tục từ ô đã dừng
  * Nếu hết lượt giữa chừng, khi có lượt mới có thể tiếp tục từ ô hiện tại

---

#### **Screen 4 – Reward Popup (Popup thưởng - Đơn giản)**

* **Purpose**: Hiển thị phần thưởng người chơi nhận được sau khi Tebbi dừng tại một tỉnh.
* **Components**: 
  * **Modal/Popup overlay** (chiếm 70-80% màn hình, center):
    * Background màu Tết đơn giản (không cần hiệu ứng phức tạp)
    * Tên tỉnh vừa đến (text đơn giản)
    * **Reward content** (thay đổi theo loại thưởng):
      * **Nếu là tiền**: Icon VNĐ + Số tiền lớn (2k/5k/10k) + Text "Hoàn tiền vào ví thưởng" + Câu chúc Tết ngắn
      * **Nếu là câu chúc**: Icon đơn giản + Câu chúc Tết lớn (ví dụ: "An khang thịnh vượng")
      * **Nếu là lượt**: Icon bao lì xì + Text "+1 lượt" hoặc "+2 lượt" + Câu chúc Tết ngắn
    * Button "Tiếp tục" (CTA chính)
  * **Background dimmed**: Màn hình phía sau bị làm mờ
* **User Actions**:
  * Click "Tiếp tục" → Đóng popup và quay về Screen 3 (Màn hình bàn cờ tỉnh) hoặc Screen 2 (Bản đồ tổng quát) tùy ngữ cảnh
  * Click outside popup → Đóng popup (optional)
* **Animation**:
  * Popup fade in từ center (CSS transition) + sound effect
  * Hiệu ứng pháo hoa khi hiển thị thưởng
  * Confetti animation nếu là thưởng lớn (10k hoặc lượt)
* **Lưu ý**: Nếu về đích (hoàn thành vòng), popup này sẽ hiển thị thêm thông tin về mảnh ghép nhận được

---

#### **Screen 5 – Puzzle Popup (Popup mảnh ghép - Đơn giản)**

* **Purpose**: Hiển thị tiến độ thu thập 4 mảnh ghép hành trình (có thể tích hợp vào reward popup khi về đích).
* **Components**: 
  * **Modal/Popup overlay** (chiếm 70-80% màn hình, center):
    * Header: "Mảnh ghép hành trình" + Close button
    * **Puzzle grid**: 2x2 grid đơn giản hiển thị 4 mảnh ghép:
      * Mảnh đã có: Icon/hình ảnh đơn giản với tên (Xuân Bắc, Xuân Trung, Xuân Nam, Xuân Biển đảo)
      * Mảnh chưa có: Icon placeholder với dấu "?"
    * **Progress text**: "Bạn đã có X/4 mảnh ghép"
    * **Info text**: "Hoàn thành đủ 4 mảnh để nhận thưởng lớn!"
    * Button "Tiếp tục" hoặc "Đóng"
  * **Background dimmed**
* **User Actions**:
  * Click "Tiếp tục" hoặc "Đóng" → Quay về Screen 2 (Bản đồ tổng quát)
* **Special state**: Nếu đủ 4 mảnh → Popup này sẽ tự động chuyển thành popup "Hoàn thành" với thưởng lớn
* **Lưu ý**: Popup này có thể được tích hợp vào reward popup khi về đích để giảm số lượng màn hình

---

#### **Screen 6 – Check-in Popup (Popup điểm danh - Tùy chọn)**

* **Purpose**: Cho phép người chơi điểm danh nhiều lần trong ngày theo các mốc thời gian để nhận +1 lượt mỗi lần (đơn giản hóa).
* **Components**: 
  * **Modal/Popup overlay** (chiếm 60-70% màn hình, center):
    * Header: "Điểm danh nhận lộc" + Close button
    * Icon điểm danh lớn
    * Text: "Điểm danh tại các mốc thời gian để nhận +1 lượt chơi mỗi lần!"
    * **Danh sách mốc thời gian** (ví dụ: 8h, 12h, 18h, 22h):
      * Mỗi mốc hiển thị với trạng thái: "Đã điểm danh" (checkmark) hoặc "Chưa điểm danh" (button)
      * Hiển thị thời gian còn lại đến mốc tiếp theo (nếu chưa đến mốc)
    * **Status**: 
      * Nếu có mốc đang mở: Button "Điểm danh ngay" tại mốc đó
      * Nếu đã điểm hết các mốc trong ngày: Text "Bạn đã điểm danh đủ các mốc hôm nay rồi" + Thời gian reset ngày mới
      * Nếu chưa đến mốc tiếp theo: Text "Mốc tiếp theo: [thời gian]" + Countdown timer
    * Button "Đóng"
  * **Background dimmed**
* **User Actions**:
  * Click "Điểm danh ngay" tại mốc đang mở → Animation checkmark đơn giản → Hiển thị "+1 lượt đã được cộng" → Cập nhật trạng thái mốc → Đóng popup và quay về Screen 2 (Bản đồ tổng quát)
  * Click "Đóng" → Quay về Screen 2 (Bản đồ tổng quát)
* **Lưu ý**: Tính năng này chỉ làm nếu có thời gian dư. Có thể đơn giản hóa thành button trên Screen 2 (Bản đồ tổng quát) thay vì popup riêng

---

#### **Screen 7 – Mission Screen (LOẠI BỎ trong Phase 1)**

* **Purpose**: Tính năng này được loại bỏ trong Phase 1 để đảm bảo timeline 1 tuần.
* **Lý do**: Nhiệm vụ phức tạp cần tích hợp với nhiều hệ thống khác, tốn thời gian phát triển và test.
* **Thay thế**: Các nhiệm vụ đơn giản (như đăng nhập, hoàn thành vòng) sẽ tự động cộng thưởng mà không cần màn hình riêng.

---

#### **Screen 8 – Completion Popup (Popup hoàn thành 4 mảnh - Đơn giản)**

* **Purpose**: Popup đặc biệt khi người chơi hoàn thành đủ 4 mảnh ghép, trao thưởng lớn và reset vòng.
* **Components**: 
  * **Modal/Popup overlay** (chiếm 80-90% màn hình, center):
    * Background màu Tết đặc biệt (đỏ vàng)
    * Icon Tebbi lớn
    * Text lớn: "Chúc mừng! Tebbi đã hoàn thành Hành Trình Du Xuân Việt Nam - Cưỡi ngựa vàng săn ngàn lộc!"
    * **Puzzle complete**: Hiển thị 4 mảnh ghép đã ghép thành bản đồ hoàn chỉnh (hình ảnh đơn giản)
    * **Reward display**: 
      * Icon VNĐ lớn
      * Số tiền thưởng lớn (50k-100k VNĐ)
      * Text "Hoàn tiền vào ví thưởng"
    * Button "Nhận thưởng và chơi tiếp"
  * **Background dimmed**
* **User Actions**:
  * Click "Nhận thưởng và chơi tiếp" → Trao thưởng → Reset vòng tự động → Đóng popup và quay về Screen 2 (Bản đồ tổng quát)
* **Animation**:
  * Popup fade in với scale effect + sound effect đặc biệt
  * Pháo hoa liên tục trong 5-10 giây
  * Confetti rơi từ trên xuống trong 3-5 giây
  * Animation ghép 4 mảnh thành bản đồ hoàn chỉnh

---

### **5.2 Visual Guideline (Hướng dẫn thiết kế)**

* **Color (Màu sắc)**: 
  * **Màu chủ đạo**: Đỏ Tết (#E53E3E, #C53030) và Vàng (#F6E05E, #D69E2E) - tạo cảm giác Tết truyền thống
  * **Màu phụ**: Xanh lá (#48BB78) cho bản đồ Việt Nam, Trắng (#FFFFFF) cho background
  * **Màu brand Tebbi**: Xanh lá cây (#48BB78 hoặc màu xanh lá cây của brand Tebbi)
  * **Màu trạng thái**:
    * Success: Xanh lá (#48BB78) - cho thưởng, hoàn thành nhiệm vụ
    * Warning: Vàng (#F6E05E) - cho cảnh báo hết lượt
    * Info: Xanh dương (#4299E1) - cho thông tin
    * Error: Đỏ (#E53E3E) - cho lỗi (hiếm khi dùng)
  * **Màu action buttons**: 
    * Primary CTA: Đỏ Tết (#E53E3E) với text trắng
    * Secondary: Trắng với border đỏ
    * Disabled: Xám (#A0AEC0)

* **Font (Phông chữ)**: 
  * **Font family**: 
    * Tiêu đề: Font có tính vui tươi, phù hợp Tết (ví dụ: Montserrat Bold, hoặc font custom nếu có)
    * Body: Font dễ đọc trên mobile (ví dụ: Inter, Roboto, hoặc system font)
  * **Kích thước chữ**:
    * Heading 1 (Tiêu đề màn hình): 24-28px
    * Heading 2 (Tiêu đề section): 20-22px
    * Body (Nội dung chính): 16px
    * Caption (Ghi chú nhỏ): 14px
    * Button text: 16-18px
  * **Font weight**: 
    * Bold (700) cho tiêu đề và CTA
    * Regular (400) cho body text
    * Medium (500) cho text quan trọng

* **Animation (Hiệu ứng)**: 
  * **Xúc xắc quay**: 1-2 giây với CSS animation + sound effect (tiếng xúc xắc lăn)
  * **Tebbi di chuyển**: 0.5-1 giây với fade out/in hoặc slide + sound effect (tiếng ngựa chạy)
  * **Popup thưởng**: Fade in 0.3s + scale từ 0.9 → 1.0 (CSS transition) + sound effect (tiếng "ting" khi nhận thưởng)
  * **Pháo hoa**: Hiệu ứng pháo hoa khi Tebbi dừng tại tỉnh mới và khi nhận thưởng lớn
  * **Confetti animation**: Rơi từ trên xuống khi nhận thưởng lớn (hoàn thành 4 mảnh ghép)
  * **Loading**: Spinner đơn giản khi đang tải dữ liệu
  * **Button press**: Scale down 0.95 khi click, scale về 1.0 khi release (0.1s) + sound effect (tiếng click)
  * **Nhạc game**: Nhạc nền Tết vui tươi phát liên tục trong game (có thể tắt/bật)

* **Note (Ghi chú)**: 
  * **Responsive design**: 
    * Mobile-first approach, tối ưu cho màn hình 375px - 414px (iPhone)
    * Hỗ trợ màn hình lớn hơn (tablet) nhưng không bắt buộc
    * Touch-friendly: Button tối thiểu 44x44px, khoảng cách giữa các element đủ lớn
  * **Accessibility**: 
    * Contrast ratio đạt WCAG AA (tối thiểu 4.5:1 cho text)
    * Hỗ trợ screen reader với alt text cho icons và images
    * Có thể điều hướng bằng keyboard (nếu có web version)
  * **Performance (Đơn giản hóa)**: 
    * Load time màn hình đầu tiên < 3 giây (cho phép linh hoạt hơn với timeline ngắn)
    * Animation cơ bản, không cần đạt 60fps hoàn hảo (chấp nhận được nếu đơn giản)
    * Optimize file size: Images < 300KB, total bundle < 1.5MB (cho phép linh hoạt hơn)
  * **Brand guidelines**: 
    * Tuân thủ brand identity của Rovi Travel và Tebbi
    * Sử dụng logo và màu sắc brand đúng quy định
    * Giữ tone of voice nhất quán với brand (vui tươi, thân thiện)

---

**Tài liệu này được tạo bởi BA Team và cần được review bởi Product Manager, Tech Lead, và Design Team trước khi bắt đầu development.**

**Version**: 1.1 (Tinh chỉnh cho timeline 1 tuần)  
**Last Updated**: [Ngày cập nhật]  
**Owner**: BA Team  
**Status**: Draft - Pending Review  
**Timeline**: 1 tuần (Phase 1)  
**Priority**: Must-have features được đánh dấu rõ ràng, các tính năng tùy chọn có thể làm sau
